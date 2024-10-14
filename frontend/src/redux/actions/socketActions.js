import {
  updateMeetingRequestStatus,
  setMeetingLink,
  getMeetingDetails,
  GET_MEETING_DETAILS,
  MEETING_ERROR
} from './meetingActions';

/**
 * Handles receiving a new message.
 * @param {Object} message - The received message object.
 * @returns {Object} An action object.
 */
export const receiveMessage = (message) => ({
  type: 'RECEIVE_MESSAGE',
  payload: message
});

/**
 * Initiates a meeting request.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Object} An action object.
 */
export const requestMeeting = (exchangeId) => ({
  type: 'REQUEST_MEETING',
  payload: exchangeId
});

/**
 * Accepts a meeting request.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Object} An action object.
 */
export const acceptMeeting = (exchangeId) => ({
  type: 'ACCEPT_MEETING',
  payload: exchangeId
});

/**
 * Handles the event when a meeting is requested.
 * @returns {Function} A Redux thunk function.
 */
export const handleMeetingRequested = () => (dispatch) => {
  dispatch(updateMeetingRequestStatus('requested'));
  dispatch(requestMeeting());
};

/**
 * Handles the event when a meeting is accepted.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const handleMeetingAccepted = (exchangeId) => async (dispatch) => {
  dispatch(updateMeetingRequestStatus('accepted'));
  dispatch(acceptMeeting());
  
  try {
    const action = await dispatch(getMeetingDetails(exchangeId));
    if (action.type === GET_MEETING_DETAILS) {
      const response = action.payload;
      if (!response || !response.meetingLink) {
        console.error('Failed to get meeting details:', response);
        throw new Error('Failed to get meeting details. Please try again.');
      }
    } else if (action.type === MEETING_ERROR) {
      throw new Error(action.payload);
    }
  } catch (error) {
    console.error('Error getting meeting details:', error);
    throw new Error('An error occurred while getting meeting details. Please try again.');
  }
};

/**
 * Handles the success of a meeting request.
 * @param {Object} data - The response data from the server.
 * @returns {Function} A Redux thunk function.
 */
export const handleRequestMeetingSuccess = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus('requested'));
};

/**
 * Handles the success of accepting a meeting.
 * @param {Object} data - The response data from the server.
 * @returns {Function} A Redux thunk function.
 */
export const handleAcceptMeetingSuccess = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus('accepted'));
  if (data.meetingLink) dispatch(setMeetingLink(data.meetingLink));
};

/**
 * Handles updates to the meeting status.
 * @param {Object} data - The updated meeting status data.
 * @returns {Function} A Redux thunk function.
 */
export const handleMeetingStatusUpdate = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus(data.status));
  if (data.meetingLink) dispatch(setMeetingLink(data.meetingLink));
};