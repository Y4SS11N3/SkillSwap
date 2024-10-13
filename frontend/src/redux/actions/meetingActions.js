import meetingService from '../../services/meetingService';

export const REQUEST_MEETING = 'REQUEST_MEETING';
export const ACCEPT_MEETING = 'ACCEPT_MEETING';
export const GET_MEETING_DETAILS = 'GET_MEETING_DETAILS';
export const MEETING_ERROR = 'MEETING_ERROR';

export const requestMeeting = (exchangeId) => async (dispatch) => {
  try {
    const response = await meetingService.requestMeeting(exchangeId);
    dispatch({ type: REQUEST_MEETING, payload: response });
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.response.data.message });
  }
};

export const acceptMeeting = (exchangeId) => async (dispatch) => {
  try {
    const response = await meetingService.acceptMeeting(exchangeId);
    dispatch({ type: ACCEPT_MEETING, payload: response });
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.response.data.message });
  }
};

export const getMeetingDetails = (exchangeId) => async (dispatch) => {
  try {
    const response = await meetingService.getMeetingDetails(exchangeId);
    dispatch({ type: GET_MEETING_DETAILS, payload: response });
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.response.data.message });
  }
};