import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/exchanges`;

const exchangeService = {
  createExchange: async (providerId, requesterSkillId, providerSkillId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(API_URL, { providerId, requesterSkillId, providerSkillId }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  getExchanges: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  updateExchangeStatus: async (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.put(`${API_URL}/${id}`, { status }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  cancelExchange: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  searchSkills: async (query) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  getExchangeDetails: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export default exchangeService;