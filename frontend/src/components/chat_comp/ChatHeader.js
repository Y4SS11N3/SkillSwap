import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon } from 'lucide-react';

const ChatHeader = ({ id, requesterSkill, providerSkill }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeftIcon size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Chat #{id}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {requesterSkill} ↔ {providerSkill}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;