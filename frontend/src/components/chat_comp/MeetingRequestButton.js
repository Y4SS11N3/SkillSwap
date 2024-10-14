import React from 'react';

const MeetingRequestButton = ({ onRequest, meetingRequestStatus, isRequestingMeeting }) => {
  if (meetingRequestStatus === 'requested') {
    return (
      <button
        disabled
        className="bg-slate-100 text-slate-800 font-bold py-2 px-4 rounded cursor-not-allowed"
      >
        Meeting Requested
      </button>
    );
  }

  return (
    <button
      onClick={onRequest}
      disabled={isRequestingMeeting}
      className={`font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
        isRequestingMeeting
          ? 'bg-slate-100 text-slate-800 cursor-not-allowed'
          : 'bg-sky-100 hover:bg-sky-200 text-sky-800'
      }`}
    >
      {isRequestingMeeting ? 'Requesting Meeting...' : 'Request Live Meeting'}
    </button>
  );
};

export default MeetingRequestButton;