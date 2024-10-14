import React from 'react';
import { useSelector } from 'react-redux';
import MeetingRequestButton from './MeetingRequestButton';
import MeetingAcceptButton from './MeetingAcceptButton';

const MeetingControls = ({
    exchangeStatus,
    currentUserId,
    requesterId,
    providerId,
    onRequestMeeting,
    onAcceptMeeting,
    isRequestingMeeting
  }) => {
  const { meetingRequestStatus } = useSelector(state => state.meeting);

  if (exchangeStatus !== 'accepted') return null;

  return (
    <div className="bg-white p-4 shadow-md">
      {meetingRequestStatus === 'none' && currentUserId === requesterId && (
        <MeetingRequestButton 
          onRequest={onRequestMeeting} 
          meetingRequestStatus={meetingRequestStatus}
          isRequestingMeeting={isRequestingMeeting}
        />
      )}
      {meetingRequestStatus === 'requested' && currentUserId === providerId && (
        <MeetingAcceptButton onAccept={onAcceptMeeting} />
      )}
      {meetingRequestStatus === 'requested' && currentUserId === requesterId && (
        <p className="text-gray-600 italic">Waiting for the other user to accept the meeting request...</p>
      )}
      {meetingRequestStatus === 'accepted' && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">
            Meeting Instructions:
          </h3>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Allow microphone and camera access when prompted.</li>
            <li>Enter your name when asked.</li>
            <li>You will join the meeting room immediately.</li>
            <li>If you're the first to join, wait for the other participant.</li>
            <li>Once both participants have joined, you can start your meeting!</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default MeetingControls;