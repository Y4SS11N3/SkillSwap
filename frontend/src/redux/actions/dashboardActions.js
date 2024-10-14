import dashboardService from '../../services/dashboardService';

export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';
export const DASHBOARD_ERROR = 'DASHBOARD_ERROR';

/**
 * Fetches dashboard data.
 * @returns {Function} A Redux thunk function.
 */
export const getDashboardData = () => async (dispatch) => {
  try {
    const data = await dashboardService.getDashboardData();
    dispatch({ type: GET_DASHBOARD_DATA, payload: data });
  } catch (error) {
    dispatch({ type: DASHBOARD_ERROR, payload: error.response?.data?.message || 'An error occurred' });
  }
};