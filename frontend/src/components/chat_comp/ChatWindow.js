import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, onSendMessage, currentUserId, getUserName }) => {
  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} currentUserId={currentUserId} getUserName={getUserName} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;