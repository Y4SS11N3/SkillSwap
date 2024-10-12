import React from 'react';

const ExchangeCard = ({ exchange, getStatusColor, currentUserId }) => {
  const isRequester = exchange.requesterId === currentUserId;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(exchange.status)}`}>
          {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
        </span>
      </div>
      <div className="mb-4 space-y-2">
        <p className={`text-sm font-semibold ${isRequester ? 'text-blue-500' : 'text-gray-700'}`}>
          {isRequester ? "You requested an exchange" : "They request an exchange from you"}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">{isRequester ? "You offer: " : "They offer: "}</span>
          <span className="font-medium text-gray-800">{exchange.providerSkill.name}</span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500">{isRequester ? "They'll teach you: " : "You'll teach them: "}</span>
          <span className="font-medium text-gray-800">{exchange.requesterSkill.name}</span>
        </p>
      </div>
      <div className="flex items-center pt-2 border-t border-gray-100">
        <svg className="text-gray-400 mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10l5-6 5 6"/>
          <path d="M7 14l5 6 5-6"/>
        </svg>
        <p className="text-sm text-gray-600">
          With: <span className="font-medium text-gray-800">{isRequester ? exchange.provider.name : exchange.requester.name}</span>
        </p>
      </div>
    </div>
  );
};

export default ExchangeCard;