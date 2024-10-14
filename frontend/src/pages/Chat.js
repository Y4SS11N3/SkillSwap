import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getExchangeDetails } from '../redux/actions/exchangeActions';
import { getMessages } from '../redux/actions/messageActions';
import ChatHeader from '../components/chat_comp/ChatHeader';
import MeetingControls from '../components/chat_comp/MeetingControls';
import ChatWindow from '../components/chat_comp/ChatWindow';
import ErrorDisplay from '../components/chat_comp/ErrorDisplay';
import useChatSocketHandler from '../components/chat_comp/ChatSocketHandler';
import { getCurrentUserId } from '../utils/utils';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentExchange } = useSelector(state => state.exchange);
  const { messages } = useSelector(state => state.message);
  const { meetingLink } = useSelector(state => state.meeting);
  const [error, setError] = useState(null);
  const [isRequestingMeeting, setIsRequestingMeeting] = useState(false);

  const userId = getCurrentUserId();

  const {
    handleSendMessage,
    handleRequestMeeting,
    handleAcceptMeeting
  } = useChatSocketHandler(id, userId, setError, isRequestingMeeting, setIsRequestingMeeting);

  useEffect(() => {
    if (!userId) {
      setError('User not authenticated. Please log in.');
      return;
    }

    dispatch(getExchangeDetails(id));
    dispatch(getMessages(id));
  }, [dispatch, id, userId]);

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
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-sky-100">
      <ChatHeader
        id={id}
        requesterSkill={currentExchange.requesterSkill.name}
        providerSkill={currentExchange.providerSkill.name}
      />
      <ErrorDisplay error={error} />
      <div className="flex-grow overflow-hidden">
        <div className="h-full flex flex-col">
          <MeetingControls
            exchangeStatus={currentExchange.status}
            meetingRequestStatus={currentExchange.meetingRequestStatus}
            meetingLink={meetingLink}
            currentUserId={userId}
            requesterId={currentExchange.requesterId}
            providerId={currentExchange.providerId}
            onRequestMeeting={handleRequestMeeting}
            onAcceptMeeting={handleAcceptMeeting}
            isRequestingMeeting={isRequestingMeeting}
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