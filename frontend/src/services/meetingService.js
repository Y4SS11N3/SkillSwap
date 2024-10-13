import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/meetings`;

const meetingService = {
  requestMeeting: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${API_URL}/${exchangeId}/request`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  acceptMeeting: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${API_URL}/${exchangeId}/accept`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  getMeetingDetails: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${exchangeId}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export default meetingService;