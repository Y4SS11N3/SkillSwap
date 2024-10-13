import React from 'react';

const MeetingRequestButton = ({ onRequest }) => {
  return (
    <button
      onClick={onRequest}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Request Live Meeting
    </button>
  );
};

export default MeetingRequestButton;