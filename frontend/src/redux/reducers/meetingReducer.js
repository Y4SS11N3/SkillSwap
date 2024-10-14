import {
    REQUEST_MEETING,
    ACCEPT_MEETING,
    GET_MEETING_DETAILS,
    MEETING_ERROR,
    UPDATE_MEETING_REQUEST_STATUS,
    RESET_MEETING_STATE,
    SET_MEETING_LINK
  } from '../actions/meetingActions';
  
  const initialState = {
    meetingLink: null,
    error: null,
    meetingRequestStatus: 'none'
  };
  
  const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_MEETING:
        return {
          ...state,
          meetingRequestStatus: 'requested',
          error: null
        };
      case ACCEPT_MEETING:
        return {
          ...state,
          meetingRequestStatus: 'accepted',
          error: null
        };
      case GET_MEETING_DETAILS:
        return {
          ...state,
          meetingLink: action.payload.meetingLink,
          error: null
        };
      case MEETING_ERROR:
        return {
          ...state,
          error: action.payload,
          meetingRequestStatus: 'none'
        };
      case UPDATE_MEETING_REQUEST_STATUS:
        return {
          ...state,
          meetingRequestStatus: action.payload
        };
      case RESET_MEETING_STATE:
        return {
          ...initialState
        };
      case SET_MEETING_LINK:
        return {
          ...state,
          meetingLink: action.payload
        };
      default:
        return state;
    }
  };
  
  export default meetingReducer;