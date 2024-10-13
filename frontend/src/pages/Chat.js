import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeDetails } from '../redux/actions/exchangeActions';
import { getMessages, sendMessage } from '../redux/actions/messageActions';
import ChatWindow from '../components/chat_comp/ChatWindow';
import { initializeSocket, disconnectSocket } from '../services/socketService';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExchange } = useSelector(state => state.exchange);
  const { messages } = useSelector(state => state.message);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(getExchangeDetails(id));
    dispatch(getMessages(id));
    const newSocket = initializeSocket();
    setSocket(newSocket);

    return () => {
      disconnectSocket(newSocket);
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_chat', id);

      socket.on('receive_message', (message) => {
        dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
      });
    }
  }, [socket, id, dispatch]);

  const handleSendMessage = (content) => {
    dispatch(sendMessage(id, content));
    if (socket) {
      socket.emit('send_message', { exchangeId: id, content });
    }
  };

  if (!currentExchange) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chat for Exchange #{id}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {currentExchange.requesterSkill.name} ↔ {currentExchange.providerSkill.name}
        </h2>
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUserId={currentExchange.requesterId}
        />
      </div>
    </div>
  );
};

export default Chat;