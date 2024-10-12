import React from 'react';
import { ArrowLeftRight, User } from 'lucide-react';

const ExchangeCard = ({ exchange, getStatusColor, currentUserId }) => {
  const isRequester = exchange.requesterId === currentUserId;

  const userSkill = isRequester ? exchange.requesterSkill : exchange.providerSkill;
  const otherSkill = isRequester ? exchange.providerSkill : exchange.requesterSkill;
  const otherPerson = isRequester ? exchange.provider : exchange.requester;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(exchange.status)}`}>
          {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
        </span>
        <p className="text-sm text-gray-600">
          {isRequester ? "You requested an exchange" : "They request an exchange from you"}
        </p>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-600">{isRequester ? "You offer" : "They offer"}</p>
          <h3 className="font-semibold text-lg">{isRequester ? userSkill.name : otherSkill.name}</h3>
        </div>
        <ArrowLeftRight className="mx-2 text-blue-500" size={24} />
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-600">{isRequester ? "You'll receive" : "You'll teach them"}</p>
          <h3 className="font-semibold text-lg">{isRequester ? otherSkill.name : userSkill.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <User className="text-gray-400 mr-2" size={16} />
        <p className="text-sm text-gray-600">
          With: <span className="font-semibold">{otherPerson.name}</span>
        </p>
      </div>
    </div>
  );
};

export default ExchangeCard;