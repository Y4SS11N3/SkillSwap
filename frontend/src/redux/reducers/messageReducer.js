import {
    GET_MESSAGES,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    MESSAGE_ERROR
  } from '../actions/messageActions';
  
  const initialState = {
    messages: [],
    loading: false,
    error: null
  };
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MESSAGES:
        return {
          ...state,
          messages: action.payload,
          loading: false
        };
      case SEND_MESSAGE:
      case RECEIVE_MESSAGE:
        return {
          ...state,
          messages: [...state.messages, action.payload],
          loading: false
        };
      case MESSAGE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;