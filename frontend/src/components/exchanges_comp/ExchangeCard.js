import React from 'react';

const ExchangeCard = ({ exchange, getStatusColor, currentUserId, onStatusUpdate, onCancel }) => {
  const isRequester = exchange.requesterId === currentUserId;
  const isPending = exchange.status === 'pending';
  const isAccepted = exchange.status === 'accepted';

  const getName = (user) => user && user.name ? user.name : 'Unknown User';

  const renderButtons = () => {
    if (isRequester && isPending) {
      return (
        <button 
          onClick={() => onCancel(exchange.id)} 
          className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      );
    } else if (!isRequester && isPending) {
      return (
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => onStatusUpdate(exchange.id, 'accepted')} 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex-1 mr-2"
          >
            Accept
          </button>
          <button 
            onClick={() => onStatusUpdate(exchange.id, 'declined')} 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex-1 ml-2"
          >
            Decline
          </button>
        </div>
      );
    } else if (!isRequester && isAccepted) {
      return (
        <button 
          onClick={() => onStatusUpdate(exchange.id, 'completed')} 
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Complete
        </button>
      );
    }
    return null;
  };

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
          <span className="font-medium text-gray-800">{exchange.providerSkill ? exchange.providerSkill.name : 'Unknown Skill'}</span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500">{isRequester ? "They'll teach you: " : "You'll teach them: "}</span>
          <span className="font-medium text-gray-800">{exchange.requesterSkill ? exchange.requesterSkill.name : 'Unknown Skill'}</span>
        </p>
      </div>
      <div className="flex items-center pt-2 border-t border-gray-100">
        <svg className="text-gray-400 mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10l5-6 5 6"/>
          <path d="M7 14l5 6 5-6"/>
        </svg>
        <p className="text-sm text-gray-600">
          With: <span className="font-medium text-gray-800">{isRequester ? getName(exchange.provider) : getName(exchange.requester)}</span>
        </p>
      </div>
      {renderButtons()}
    </div>
  );
};

export default ExchangeCard;