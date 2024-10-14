import {
  updateMeetingRequestStatus,
  setMeetingLink,
  getMeetingDetails,
  GET_MEETING_DETAILS,
  MEETING_ERROR
} from './meetingActions';

export const receiveMessage = (message) => ({
  type: 'RECEIVE_MESSAGE',
  payload: message
});

export const requestMeeting = (exchangeId) => ({
  type: 'REQUEST_MEETING',
  payload: exchangeId
});

export const acceptMeeting = (exchangeId) => ({
  type: 'ACCEPT_MEETING',
  payload: exchangeId
});

export const handleMeetingRequested = () => (dispatch) => {
  dispatch(updateMeetingRequestStatus('requested'));
  dispatch(requestMeeting());
};

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

export const handleRequestMeetingSuccess = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus('requested'));
};

export const handleAcceptMeetingSuccess = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus('accepted'));
  if (data.meetingLink) dispatch(setMeetingLink(data.meetingLink));
};

export const handleMeetingStatusUpdate = (data) => (dispatch) => {
  dispatch(updateMeetingRequestStatus(data.status));
  if (data.meetingLink) dispatch(setMeetingLink(data.meetingLink));
};