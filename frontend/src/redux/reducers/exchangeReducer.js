import {
    CREATE_EXCHANGE,
    GET_EXCHANGES,
    UPDATE_EXCHANGE_STATUS,
    CANCEL_EXCHANGE,
    SEARCH_SKILLS,
    GET_EXCHANGE_DETAILS,
    EXCHANGE_ERROR
  } from '../actions/exchangeActions';
  
  const initialState = {
    exchanges: [],
    searchResults: [],
    currentExchange: null,
    loading: false,
    error: null
  };
  
  const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_EXCHANGE:
        return {
          ...state,
          exchanges: [action.payload, ...state.exchanges],
          loading: false
        };
      case GET_EXCHANGES:
        return {
          ...state,
          exchanges: action.payload,
          loading: false
        };
      case UPDATE_EXCHANGE_STATUS:
      case CANCEL_EXCHANGE:
        return {
          ...state,
          exchanges: state.exchanges.map(exchange =>
          exchange.id === action.payload.id
              ? {
                  ...exchange,
                  ...action.payload,
                  requesterSkill: action.payload.requesterSkill || exchange.requesterSkill,
                  providerSkill: action.payload.providerSkill || exchange.providerSkill,
                  requester: action.payload.requester || exchange.requester,
                  provider: action.payload.provider || exchange.provider
                }
              : exchange
          ),
          loading: false
        };
      case SEARCH_SKILLS:
        return {
          ...state,
          searchResults: action.payload,
          loading: false
        };
      case GET_EXCHANGE_DETAILS:
        return {
          ...state,
          currentExchange: {
            ...action.payload,
            meetingRequestStatus: action.payload.meetingRequestStatus
          },
          error: null
        };
      case EXCHANGE_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default exchangeReducer;