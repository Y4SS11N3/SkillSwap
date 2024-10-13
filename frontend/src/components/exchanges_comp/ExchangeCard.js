import React from 'react';
import { Link } from 'react-router-dom';

const ExchangeCard = ({ exchange, currentUserId, onStatusUpdate, onCancel }) => {
  const isRequester = exchange.requesterId === currentUserId;
  const isPending = exchange.status === 'pending';
  const isAccepted = exchange.status === 'accepted';

  const getName = (user) => user && user.name ? user.name : 'Unknown User';

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'accepted': return 'bg-teal-100 text-teal-800';
      case 'declined': return 'bg-rose-100 text-rose-800';
      case 'canceled': return 'bg-slate-100 text-slate-800';
      case 'completed': return 'bg-sky-100 text-sky-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const renderButtons = () => {
    const buttons = [];

    if (isAccepted) {
      buttons.push(
        <Link 
          to={`/chat/${exchange.id}`}
          className="w-full mt-2 bg-sky-500 text-white py-2 px-4 rounded-full hover:bg-sky-600 transition duration-300 text-center"
          key="chat"
        >
          Chat
        </Link>
      );
    }

    if (isRequester && isPending) {
      buttons.push(
        <button 
          onClick={() => onCancel(exchange.id)} 
          className="w-full mt-2 bg-rose-500 text-white py-2 px-4 rounded-full hover:bg-rose-600 transition duration-300"
          key="cancel"
        >
          Cancel
        </button>
      );
    } else if (!isRequester && isPending) {
      buttons.push(
        <button 
          onClick={() => onStatusUpdate(exchange.id, 'accepted')} 
          className="w-full mt-2 bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300"
          key="accept"
        >
          Accept
        </button>,
        <button 
          onClick={() => onStatusUpdate(exchange.id, 'declined')} 
          className="w-full mt-2 bg-rose-500 text-white py-2 px-4 rounded-full hover:bg-rose-600 transition duration-300"
          key="decline"
        >
          Decline
        </button>
      );
    } else if (!isRequester && isAccepted) {
      buttons.push(
        <button 
          onClick={() => onStatusUpdate(exchange.id, 'completed')} 
          className="w-full mt-2 bg-sky-500 text-white py-2 px-4 rounded-full hover:bg-sky-600 transition duration-300"
          key="complete"
        >
          Complete
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(exchange.status)}`}>
          {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
        </span>
      </div>
      <div className="mb-4 space-y-3">
        <p className={`text-sm font-semibold ${isRequester ? 'text-sky-600' : 'text-slate-700'}`}>
          {isRequester ? "You requested an exchange" : "They request an exchange from you"}
        </p>
        <div className="flex items-center space-x-2">
          <div className="w-1/2 p-2 bg-amber-50 rounded-lg">
            <p className="text-xs text-amber-800 font-medium mb-1">{isRequester ? "You offer" : "They offer"}</p>
            <p className="text-sm font-semibold text-slate-800">{exchange.providerSkill ? exchange.providerSkill.name : 'Unknown Skill'}</p>
          </div>
          <div className="w-1/2 p-2 bg-teal-50 rounded-lg">
            <p className="text-xs text-teal-800 font-medium mb-1">{isRequester ? "They'll teach" : "You'll teach"}</p>
            <p className="text-sm font-semibold text-slate-800">{exchange.requesterSkill ? exchange.requesterSkill.name : 'Unknown Skill'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-3 border-t border-slate-200">
        <svg className="text-slate-400 mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <p className="text-sm text-slate-600">
          With: <span className="font-medium text-slate-800">{isRequester ? getName(exchange.provider) : getName(exchange.requester)}</span>
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {renderButtons()}
      </div>
    </div>
  );
};

export default ExchangeCard;