const { Message, User, Exchange } = require('./models/associations');
const meetingController = require('./controllers/meetingController');

async function createAndEmitMessage(io, data) {
  try {
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
      sender: {
        id: messageWithUser.sender.id,
        name: messageWithUser.sender.name
      },
      createdAt: messageWithUser.createdAt
    });
  } catch (error) {
    throw new Error('Failed to save message: ' + error.message);
  }
}

async function handleMeetingAction(socket, exchangeId, action) {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const req = { params: { exchangeId }, user: { id: userId } };
  const res = {
    json: (data) => {
      if (data.message) {
        socket.emit('meeting_error', { message: data.message });
      } else {
        const event = action === 'request' ? 'meeting_requested' : 'meeting_accepted';
        const emitTo = action === 'request' ? socket.to(exchangeId) : socket.to(exchangeId);
        emitTo.emit(event, action === 'accept' ? { meetingLink: data.meetingLink } : undefined);
      }
    },
    status: (statusCode) => ({
      json: (data) => {
        socket.emit('meeting_error', { message: data.message, statusCode });
      }
    })
  };

  await (action === 'request' ? meetingController.requestMeeting : meetingController.acceptMeeting)(req, res, (error) => {
    if (error) {
      throw new Error(`Failed to ${action} meeting: ${error.message}`);
    }
  });
}

function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_chat', (exchangeId) => {
      socket.join(exchangeId);
    });

    socket.on('send_message', async (data) => {
      try {
        await createAndEmitMessage(io, data);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('message_error', { message: error.message });
      }
    });

    socket.on('request_meeting', async ({ exchangeId }) => {
      try {
        await handleMeetingAction(socket, exchangeId, 'request');
      } catch (error) {
        console.error('Error in request_meeting socket event:', error);
        socket.emit('meeting_error', { message: error.message });
      }
    });

    socket.on('accept_meeting', async ({ exchangeId }) => {
      try {
        await handleMeetingAction(socket, exchangeId, 'accept');
      } catch (error) {
        console.error('Error in accept_meeting socket event:', error);
        socket.emit('meeting_error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

module.exports = setupSocketHandlers;