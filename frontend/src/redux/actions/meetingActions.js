import meetingService from '../../services/meetingService';

export const REQUEST_MEETING = 'REQUEST_MEETING';
export const ACCEPT_MEETING = 'ACCEPT_MEETING';
export const GET_MEETING_DETAILS = 'GET_MEETING_DETAILS';
export const MEETING_ERROR = 'MEETING_ERROR';
export const UPDATE_MEETING_REQUEST_STATUS = 'UPDATE_MEETING_REQUEST_STATUS';
export const RESET_MEETING_STATE = 'RESET_MEETING_STATE';
export const SET_MEETING_LINK = 'SET_MEETING_LINK';

/**
 * Requests a meeting for a specific exchange.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const requestMeeting = (exchangeId) => async (dispatch) => {
  try {
    const status = await meetingService.getMeetingStatus(exchangeId);
    if (status !== 'none') {
      throw new Error('A meeting request is already pending or accepted for this exchange');
    }
    dispatch({ type: REQUEST_MEETING });
    dispatch(updateMeetingRequestStatus('requested'));
    const response = await meetingService.requestMeeting(exchangeId);
    return { type: REQUEST_MEETING, payload: response };
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.message || 'Failed to request meeting' });
    return { type: MEETING_ERROR, payload: error.message || 'Failed to request meeting' };
  }
};

/**
 * Accepts a meeting for a specific exchange.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const acceptMeeting = (exchangeId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_MEETING });
    dispatch(updateMeetingRequestStatus('accepted'));
    const response = await meetingService.acceptMeeting(exchangeId);
    dispatch({ type: ACCEPT_MEETING, payload: response });
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.response.data.message });
  }
};

/**
 * Fetches meeting details for a specific exchange.
 * @param {string} exchangeId - The ID of the exchange.
 * @returns {Function} A Redux thunk function.
 */
export const getMeetingDetails = (exchangeId) => async (dispatch) => {
  try {
    const response = await meetingService.getMeetingDetails(exchangeId);
    dispatch({ type: GET_MEETING_DETAILS, payload: response });
    return response;
  } catch (error) {
    dispatch({ type: MEETING_ERROR, payload: error.response?.data?.message || 'Failed to get meeting details' });
    throw error;
  }
};

/**
 * Updates the meeting request status.
 * @param {string} status - The new status of the meeting request.
 * @returns {Object} An action object.
 */
export const updateMeetingRequestStatus = (status) => ({
  type: UPDATE_MEETING_REQUEST_STATUS,
  payload: status
});

/**
 * Resets the meeting state.
 * @returns {Object} An action object.
 */
export const resetMeetingState = () => ({
    type: RESET_MEETING_STATE
});

/**
 * Sets the meeting link.
 * @param {string} link - The meeting link.
 * @returns {Object} An action object.
 */
export const setMeetingLink = (link) => ({
  type: 'SET_MEETING_LINK',
  payload: link
});