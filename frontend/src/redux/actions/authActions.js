import authService from '../../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

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

export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};