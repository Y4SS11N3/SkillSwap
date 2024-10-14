import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  receiveMessage,
  handleMeetingRequested,
  handleMeetingAccepted,
  handleRequestMeetingSuccess,
  handleAcceptMeetingSuccess,
  handleMeetingStatusUpdate
} from '../../redux/actions/socketActions';
import {
  initializeSocket,
  disconnectSocket,
  emitRequestMeeting,
  emitAcceptMeeting,
  emitSendMessage
} from '../../services/socketService';

const useChatSocketHandler = (exchangeId, userId, setError, isRequestingMeeting, setIsRequestingMeeting) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const handleReceiveMessage = useCallback((message) => {
    if (!message.id) {
      console.error('Received message without id:', message);
      return;
    }
    dispatch(receiveMessage(message));
  }, [dispatch]);

  const handleMessageError = useCallback((error) => {
    console.error('Message error:', error);
    setError(`Failed to send message: ${error.details || error.message || 'Unknown error'}`);
    setTimeout(() => setError(null), 5000);
  }, [setError]);

  const handleMeetingError = useCallback((error) => {
    console.error('Meeting error:', error);
    const errorMessage = `Failed to process meeting request: ${
      typeof error === 'string' ? error : error?.details || error?.message || JSON.stringify(error)
    }`;
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
    setIsRequestingMeeting(false);
  }, [setError, setIsRequestingMeeting]);

  useEffect(() => {
    const newSocket = initializeSocket();
    setSocket(newSocket);
    return () => disconnectSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const socketEvents = {
      'receive_message': handleReceiveMessage,
      'message_error': handleMessageError,
      'meeting_requested': () => dispatch(handleMeetingRequested()),
      'meeting_accepted': () => dispatch(handleMeetingAccepted(exchangeId)),
      'meeting_error': handleMeetingError,
      'request_meeting_success': (data) => dispatch(handleRequestMeetingSuccess(data)),
      'accept_meeting_success': (data) => dispatch(handleAcceptMeetingSuccess(data)),
      'meeting_status_update': (data) => dispatch(handleMeetingStatusUpdate(data))
    };

    socket.emit('join_chat', exchangeId);

    Object.entries(socketEvents).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.keys(socketEvents).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket, exchangeId, handleReceiveMessage, handleMessageError, handleMeetingError, dispatch]);

  const handleSendMessage = useCallback((content) => {
    if (!userId) {
      setError('User not authenticated. Please log in again.');
      return;
    }
    
    if (socket) {
      emitSendMessage(socket, { exchangeId, content });
    } else {
      console.error('Socket not initialized');
      setError('Unable to send message. Please try again.');
    }
  }, [exchangeId, userId, socket, setError]);

  const handleRequestMeeting = useCallback(async () => {
    if (isRequestingMeeting) {
      setError('A meeting request is already being processed');
      return;
    }

    try {
      setIsRequestingMeeting(true);
      const result = await dispatch({ type: 'REQUEST_MEETING', payload: exchangeId });
      if (result.type === 'MEETING_ERROR') {
        throw new Error(result.payload);
      }
      emitRequestMeeting(socket, exchangeId);
    } catch (error) {
      console.error('Error requesting meeting:', error);
      handleMeetingError(error);
    }
  }, [dispatch, exchangeId, socket, setError, isRequestingMeeting, setIsRequestingMeeting, handleMeetingError]);

  const handleAcceptMeeting = useCallback(() => {
    dispatch({ type: 'ACCEPT_MEETING', payload: exchangeId });
    emitAcceptMeeting(socket, exchangeId);
  }, [dispatch, exchangeId, socket]);

  return {
    handleSendMessage,
    handleRequestMeeting,
    handleAcceptMeeting
  };
};

export default useChatSocketHandler;