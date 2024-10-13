import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoIcon } from 'lucide-react';
import MeetingRequestButton from './MeetingRequestButton';
import MeetingAcceptButton from './MeetingAcceptButton';
import MeetingLink from './MeetingLink';

const MeetingControls = ({
  exchangeStatus,
  meetingRequestStatus,
  meetingLink,
  currentUserId,
  requesterId,
  providerId,
  onRequestMeeting,
  onAcceptMeeting
}) => {
  const [showMeetingInstructions, setShowMeetingInstructions] = useState(false);

  if (exchangeStatus !== 'accepted') return null;

  return (
    <div className="bg-white p-4 shadow-md">
      {meetingRequestStatus === 'none' && currentUserId === requesterId && (
        <MeetingRequestButton onRequest={onRequestMeeting} />
      )}
      {meetingRequestStatus === 'requested' && currentUserId === providerId && (
        <MeetingAcceptButton onAccept={onAcceptMeeting} />
      )}
      {meetingRequestStatus === 'requested' && currentUserId === requesterId && (
        <p className="text-gray-600 italic">Waiting for the other user to accept the meeting request...</p>
      )}
      {meetingRequestStatus === 'accepted' && meetingLink && (
        <div>
          <MeetingLink link={meetingLink} />
          <button
            onClick={() => setShowMeetingInstructions(!showMeetingInstructions)}
            className="mt-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showMeetingInstructions ? 'Hide' : 'Show'} meeting instructions
          </button>
          <AnimatePresence>
            {showMeetingInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-yellow-100 rounded-lg overflow-hidden"
              >
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <VideoIcon size={20} className="mr-2" />
                  Meeting Instructions:
                </h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Click the "Join Meeting" button above.</li>
                  <li>Allow microphone and camera access when prompted.</li>
                  <li>Enter your name when asked.</li>
                  <li>You will join the meeting room immediately.</li>
                  <li>If you're the first to join, wait for the other participant.</li>
                  <li>Once both participants have joined, you can start your meeting!</li>
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MeetingControls;