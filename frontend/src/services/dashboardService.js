import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/dashboard`;

const dashboardService = {
  /**
   * Fetches dashboard data from the API.
   * @returns {Promise<Object>} The dashboard data.
   */
  getDashboardData: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export default dashboardService;