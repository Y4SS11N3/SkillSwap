import authService from '../../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const login = (email, password) => async (dispatch) => {
  try {
    const data = await authService.login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    return Promise.reject(error);
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const data = await authService.signup(username, email, password);
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

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};