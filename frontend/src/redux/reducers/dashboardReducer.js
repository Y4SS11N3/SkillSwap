import { GET_DASHBOARD_DATA, DASHBOARD_ERROR } from '../actions/dashboardActions';

const initialState = {
  userSkills: [],
  recentExchanges: [],
  skillStats: [],
  loading: false,
  error: null
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        userSkills: action.payload.userSkills,
        recentExchanges: action.payload.recentExchanges,
        skillStats: action.payload.skillStats,
        loading: false,
        error: null
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;