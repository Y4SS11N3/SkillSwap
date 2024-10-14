import React from 'react';
import DOMPurify from 'dompurify';

const MessageList = ({ messages, currentUserId, getUserName }) => {
  const getMessageStyle = (senderId) => {
    if (senderId === null) {
      return 'bg-slate-100 text-slate-800';
    } else if (senderId === currentUserId) {
      return 'bg-sky-100 text-sky-800';
    } else {
      return 'bg-teal-100 text-teal-800';
    }
  };

  const sanitizeAndStyleContent = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
    
    const styledContent = sanitizedContent.replace(/<a /g, '<a class="text-blue-600 hover:text-blue-800 underline" ');
    
    return { __html: styledContent };
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.senderId === currentUserId ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${getMessageStyle(message.senderId)}`}
          >
            <div className="font-bold">{getUserName(message)}</div>
            <div 
              dangerouslySetInnerHTML={sanitizeAndStyleContent(message.content)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;