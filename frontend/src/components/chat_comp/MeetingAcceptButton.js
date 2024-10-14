import React from 'react';

const MeetingAcceptButton = ({ onAccept }) => {
  return (
    <button
      onClick={onAccept}
      className="bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Accept Live Meeting
    </button>
  );
};

export default MeetingAcceptButton;