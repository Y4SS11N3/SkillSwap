import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
  } from '../actions/authActions';
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user,
        };
      case SIGNUP_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }