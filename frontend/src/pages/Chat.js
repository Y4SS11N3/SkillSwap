import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getExchangeDetails } from '../redux/actions/exchangeActions';
import { getMessages } from '../redux/actions/messageActions';
import { requestMeeting, acceptMeeting, getMeetingDetails, updateMeetingRequestStatus } from '../redux/actions/meetingActions';
import ChatWindow from '../components/chat_comp/ChatWindow';
import ChatHeader from '../components/chat_comp/ChatHeader';
import MeetingControls from '../components/chat_comp/MeetingControls';
import { initializeSocket, disconnectSocket, emitRequestMeeting, emitAcceptMeeting } from '../services/socketService';
import { getCurrentUserId } from '../utils/utils';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExchange } = useSelector(state => state.exchange);
  const { messages } = useSelector(state => state.message);
  const { meetingLink, meetingRequestStatus } = useSelector(state => state.meeting);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  const userId = getCurrentUserId();

  const handleReceiveMessage = useCallback((message) => {
    if (!message.id) {
      console.error('Received message without id:', message);
      return;
    }
    dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
  }, [dispatch]);

  const handleMessageError = useCallback((error) => {
    console.error('Message error:', error);
    setError(`Failed to send message: ${error.details || error.message}`);
    setTimeout(() => setError(null), 5000);
  }, []);

  const handleMeetingRequested = useCallback(() => {
    dispatch(updateMeetingRequestStatus('requested'));
  }, [dispatch]);

  const handleMeetingAccepted = useCallback(() => {
    dispatch(updateMeetingRequestStatus('accepted'));
    dispatch(getMeetingDetails(id));
  }, [dispatch, id]);

  const handleMeetingError = useCallback((error) => {
    console.error('Meeting error:', error);
    setError(`Failed to process meeting request: ${error.details || error.message}`);
    setTimeout(() => setError(null), 5000);
  }, []);

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated. Please log in.');
      return;
    }

    dispatch(getExchangeDetails(id));
    dispatch(getMessages(id));
    
    const newSocket = initializeSocket();
    setSocket(newSocket);

    return () => {
      disconnectSocket(newSocket);
    };
  }, [dispatch, id, userId]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_chat', id);

      socket.on('receive_message', handleReceiveMessage);
      socket.on('message_error', handleMessageError);
      socket.on('meeting_requested', handleMeetingRequested);
      socket.on('meeting_accepted', handleMeetingAccepted);
      socket.on('meeting_error', handleMeetingError);

      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('message_error', handleMessageError);
        socket.off('meeting_requested', handleMeetingRequested);
        socket.off('meeting_accepted', handleMeetingAccepted);
        socket.off('meeting_error', handleMeetingError);
      };
    }
  }, [socket, id, handleReceiveMessage, handleMessageError, handleMeetingRequested, handleMeetingAccepted, handleMeetingError]);

  const handleSendMessage = useCallback((content) => {
    if (!userId) {
      setError('User not authenticated. Please log in again.');
      return;
    }
    
    const messageData = {
      exchangeId: id,
      content,
      senderId: userId,
    };

    if (socket) {
      socket.emit('send_message', messageData);
    } else {
      console.error('Socket not initialized');
      setError('Unable to send message. Please try again.');
    }
  }, [id, userId, socket]);

  const handleRequestMeeting = useCallback(() => {
    dispatch(requestMeeting(id));
    emitRequestMeeting(socket, id);
  }, [dispatch, id, socket]);

  const handleAcceptMeeting = useCallback(() => {
    dispatch(acceptMeeting(id));
    emitAcceptMeeting(socket, id);
  }, [dispatch, id, socket]);

  if (!currentExchange) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-700"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <ChatHeader
        id={id}
        requesterSkill={currentExchange.requesterSkill.name}
        providerSkill={currentExchange.providerSkill.name}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-grow overflow-hidden">
        <div className="h-full flex flex-col">
          <MeetingControls
            exchangeStatus={currentExchange.status}
            meetingRequestStatus={meetingRequestStatus}
            meetingLink={meetingLink}
            currentUserId={userId}
            requesterId={currentExchange.requesterId}
            providerId={currentExchange.providerId}
            onRequestMeeting={handleRequestMeeting}
            onAcceptMeeting={handleAcceptMeeting}
          />
          <div className="flex-grow overflow-hidden bg-white shadow-md">
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUserId={userId}
              getUserName={(message) => message.sender.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;