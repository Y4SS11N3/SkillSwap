import {
    REQUEST_MEETING,
    ACCEPT_MEETING,
    GET_MEETING_DETAILS,
    MEETING_ERROR
  } from '../actions/meetingActions';
  
  const initialState = {
    meetingLink: null,
    error: null
  };
  
  const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_MEETING:
      case ACCEPT_MEETING:
        return {
          ...state,
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
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default meetingReducer;