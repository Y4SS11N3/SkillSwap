import authService from '../../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

/**
 * Attempts to log in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Function} A Redux thunk function.
 */
export const login = (email, password) => async (dispatch) => {
    try {
      const data = await authService.login(email, password);
      const action = {
        type: LOGIN_SUCCESS,
        payload: data,
      };
      dispatch(action);
      return action;
    } catch (error) {
      const action = {
        type: LOGIN_FAIL,
      };
      dispatch(action);
      throw error;
    }
  };

/**
 * Attempts to sign up a new user.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Function} A Redux thunk function.
 */
export const signup = (name, email, password) => async (dispatch) => {
  try {
    const data = await authService.signup(name, email, password);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    return Promise.reject(error);
  }
};

/**
 * Logs out the current user.
 * @returns {Function} A Redux thunk function.
 */
export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};