import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeDetails } from '../redux/actions/exchangeActions';
import { getMessages } from '../redux/actions/messageActions';
import ChatWindow from '../components/chat_comp/ChatWindow';
import { initializeSocket, disconnectSocket } from '../services/socketService';
import { getCurrentUserId } from '../utils/utils';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExchange } = useSelector(state => state.exchange);
  const { messages } = useSelector(state => state.message);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  const userId = getCurrentUserId();

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

  const handleReceiveMessage = useCallback((message) => {
    if (!message.id) {
      console.error('Received message without id:', message);
      return;
    }
    dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_chat', id);

      socket.on('receive_message', handleReceiveMessage);

      socket.on('message_error', (error) => {
        console.error('Message error:', error);
        setError(`Failed to send message: ${error.details || error.message}`);
        setTimeout(() => setError(null), 5000);
      });

      return () => {
        socket.off('receive_message', handleReceiveMessage);
        socket.off('message_error');
      };
    }
  }, [socket, id, handleReceiveMessage]);

  const handleSendMessage = (content) => {
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
  };


  if (!currentExchange) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chat for Exchange #{id}</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {currentExchange.requesterSkill.name} ↔ {currentExchange.providerSkill.name}
        </h2>
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUserId={getCurrentUserId()}
          getUserName={(message) => message.sender.name}
        />
      </div>
    </div>
  );
};

export default Chat;