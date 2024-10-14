const { Message, User, Exchange } = require('./models/associations');
const meetingController = require('./controllers/meetingController');

async function createAndEmitMessage(io, data) {
    try {
        if (!data.senderId) {
            throw new Error('senderId is required');
        }

        const newMessage = await Message.create({
            content: data.content,
            exchangeId: data.exchangeId,
            senderId: data.senderId,
        });

        const messageWithUser = await Message.findByPk(newMessage.id, {
            include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }]
        });

        io.to(data.exchangeId).emit('receive_message', {
            id: messageWithUser.id,
            content: messageWithUser.content,
            exchangeId: messageWithUser.exchangeId,
            senderId: messageWithUser.senderId,
            sender: messageWithUser.sender,
            createdAt: messageWithUser.createdAt
        });
    } catch (error) {
        throw new Error('Failed to save message: ' + error.message);
    }
}

async function handleMeetingAction(io, socket, exchangeId, action) {
  
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
  
  
    try {
      if (action === 'request') {
        const currentStatus = await meetingController.getMeetingStatus(exchangeId, userId);
        
        if (currentStatus !== 'none') {
          throw new Error('A meeting request is already pending or accepted for this exchange');
        }
      }
  
      const req = { params: { exchangeId }, user: { id: userId } };
      let responseData = null;
  
      const res = {
        json: (data) => {
          responseData = data;
        },
        status: (statusCode) => ({
          json: (data) => {
            responseData = { ...data, statusCode };
          }
        })
      };
  
      await (action === 'request' ? meetingController.requestMeeting(req, res) : meetingController.acceptMeeting(req, res));

        if (responseData.statusCode && responseData.statusCode !== 200) {
            throw new Error(responseData.message || `Failed to ${action} meeting`);
        }

        const event = action === 'request' ? 'meeting_requested' : 'meeting_accepted';
        io.to(exchangeId).emit(event, {
            exchangeId,
            meetingLink: responseData.meetingLink
        });

        if (action === 'accept' && responseData.meetingLink) {
            const acceptMessage = {
              content: `Thank you for using SkillSwap! A meeting link is now available for this exchange.\n<a href="${responseData.meetingLink}" target="_blank" rel="noopener noreferrer">${responseData.meetingLink}</a>`,
              exchangeId: exchangeId,
              senderId: userId,
              type: 'system',
            };
            await createAndEmitMessage(io, acceptMessage);
          }

        io.to(exchangeId).emit('meeting_status_update', {
          status: responseData.meetingRequestStatus,
          meetingLink: responseData.meetingLink
        });
      
        socket.emit(`${action}_meeting_success`, responseData);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in ${action}_meeting:`, error);
        socket.emit('meeting_error', { message: error.message });
      }
    }
    

function setupSocketHandlers(io) {
    io.on('connection', (socket) => {

        socket.on('join_chat', (exchangeId) => {
            socket.join(exchangeId);
        });

        socket.on('send_message', async (data) => {
            try {
                const userId = socket.handshake.auth.userId;
                if (!userId) {
                    throw new Error('User not authenticated');
                }
                data.senderId = userId;
                await createAndEmitMessage(io, data);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('message_error', { message: error.message });
            }
        });

        socket.on('request_meeting', async ({ exchangeId }) => {
            try {
                await handleMeetingAction(io, socket, exchangeId, 'request');
            } catch (error) {
                console.error('Error in request_meeting socket event:', error);
                socket.emit('meeting_error', { message: error.message });
            }
        });

        socket.on('accept_meeting', async ({ exchangeId }) => {
            try {
                await handleMeetingAction(io, socket, exchangeId, 'accept');
            } catch (error) {
                console.error('Error in accept_meeting socket event:', error);
                socket.emit('meeting_error', { message: error.message });
            }
        });

        socket.on('disconnect', () => {
        });
    });
}

module.exports = setupSocketHandlers;