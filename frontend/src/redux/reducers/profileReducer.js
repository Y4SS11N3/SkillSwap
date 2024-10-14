import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    UPDATE_PROFILE_PICTURE_SUCCESS,
    UPDATE_PROFILE_PICTURE_FAIL,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAIL,
  } from '../actions/profileActions';
  
  const initialState = {
    profile: null,
    error: null,
    loading: false
  };

  export default function profileReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          profile: action.payload,
          error: null,
          loading: false
        };
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          error: null,
          loading: false
        };
      case CHANGE_PASSWORD_FAIL:
        return {
          ...state,
          error: 'Failed to change password',
          loading: false
        };
      case UPDATE_PROFILE_PICTURE_SUCCESS:
        return {
          ...state,
          profile: {
            ...state.profile,
            profilePicture: action.payload.profilePicture
          },
          error: null,
          loading: false
        };
      case GET_PROFILE_FAIL:
      case UPDATE_PROFILE_FAIL:
      case UPDATE_PROFILE_PICTURE_FAIL:
        return {
          ...state,
          error: 'Failed to fetch or update profile',
          loading: false
        };
      case DELETE_ACCOUNT_SUCCESS:
        return initialState;
      case DELETE_ACCOUNT_FAIL:
        return {
          ...state,
          error: 'Failed to delete account',
          loading: false
        };
      default:
        return state;
    }
  }