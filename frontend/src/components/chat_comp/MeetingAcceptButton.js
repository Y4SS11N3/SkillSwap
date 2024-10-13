import React from 'react';

const MeetingAcceptButton = ({ onAccept }) => {
  return (
    <button
      onClick={onAccept}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Accept Live Meeting
    </button>
  );
};

export default MeetingAcceptButton;