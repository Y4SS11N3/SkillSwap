import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageList = ({ messages, currentUserId, getUserName }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 shadow-md ${
                message.senderId === currentUserId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="font-semibold text-sm mb-1">{getUserName(message)}</p>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;