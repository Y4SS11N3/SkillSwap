import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/meetings`;

const meetingService = {
  /**
   * Requests a meeting for a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @returns {Promise<Object>} The meeting request data.
   */
  requestMeeting: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${API_URL}/${exchangeId}/request`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Accepts a meeting request for a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @returns {Promise<Object>} The accepted meeting data.
   */
  acceptMeeting: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${API_URL}/${exchangeId}/accept`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Retrieves meeting details for a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @returns {Promise<Object>} The meeting details.
   */
  getMeetingDetails: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${exchangeId}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Retrieves the meeting status for a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @returns {Promise<string>} The meeting status.
   */
  getMeetingStatus: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${exchangeId}/status`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data.status;
  },

};

export default meetingService;