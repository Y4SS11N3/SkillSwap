import React from 'react';

const MeetingLink = ({ link }) => {
  return (
    <div className="mt-4">
      <p className="font-semibold">Join the live meeting:</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Click here to join the meeting
      </a>
    </div>
  );
};

export default MeetingLink;