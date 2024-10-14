import profileService from '../../services/profileService';

import { logout } from './authActions';

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';
export const UPDATE_PROFILE_PICTURE_SUCCESS = 'UPDATE_PROFILE_PICTURE_SUCCESS';
export const UPDATE_PROFILE_PICTURE_FAIL = 'UPDATE_PROFILE_PICTURE_FAIL';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAIL = 'DELETE_ACCOUNT_FAIL';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

/**
 * Fetches the user's profile.
 * @returns {Function} A Redux thunk function.
 */
export const getProfile = () => async (dispatch) => {
  try {
    const data = await profileService.getProfile();
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
    });
    return Promise.reject(error);
  }
};

/**
 * Changes the user's password.
 * @param {Object} passwordData - The current and new password data.
 * @returns {Function} A Redux thunk function.
 */
export const changePassword = (passwordData) => async (dispatch) => {
  try {
    const data = await profileService.updateProfile(passwordData);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAIL });
    return Promise.reject(error);
  }
};

/**
 * Updates the user's profile.
 * @param {Object} profileData - The updated profile data.
 * @returns {Function} A Redux thunk function.
 */
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    const data = await profileService.updateProfile(profileData);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
    return Promise.reject(error);
  }
};

/**
 * Updates the user's profile picture.
 * @param {File} file - The new profile picture file.
 * @returns {Function} A Redux thunk function.
 */
export const updateProfilePicture = (file) => async (dispatch) => {
  try {
    const data = await profileService.updateProfilePicture(file);
    dispatch({
      type: UPDATE_PROFILE_PICTURE_SUCCESS,
      payload: data,
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_PICTURE_FAIL,
    });
    return Promise.reject(error);
  }
};

/**
 * Deletes the user's account.
 * @param {string} password - The user's password for confirmation.
 * @returns {Function} A Redux thunk function.
 */
export const deleteAccount = (password) => async (dispatch) => {
  try {
    await profileService.deleteAccount(password);
    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
    });
    dispatch(logout());
    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
    });
    return { success: false, message: error.response?.data?.error || 'Failed to delete account' };
  }
};