import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/exchanges`;

const exchangeService = {
  /**
   * Creates a new exchange.
   * @param {string} providerId - The ID of the skill provider.
   * @param {string} requesterSkillId - The ID of the requester's skill.
   * @param {string} providerSkillId - The ID of the provider's skill.
   * @returns {Promise<Object>} The created exchange data.
   */
  createExchange: async (providerId, requesterSkillId, providerSkillId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(API_URL, { providerId, requesterSkillId, providerSkillId }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Retrieves all exchanges for the current user.
   * @returns {Promise<Array>} An array of exchange objects.
   */
  getExchanges: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Updates the status of an exchange.
   * @param {string} id - The ID of the exchange to update.
   * @param {string} status - The new status of the exchange.
   * @returns {Promise<Object>} The updated exchange data.
   */
  updateExchangeStatus: async (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.put(`${API_URL}/${id}`, { status }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Cancels an exchange.
   * @param {string} id - The ID of the exchange to cancel.
   * @returns {Promise<Object>} The result of the cancellation.
   */
  cancelExchange: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Searches for skills based on a query.
   * @param {string} query - The search query.
   * @returns {Promise<Array>} An array of matching skills.
   */
  searchSkills: async (query) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Retrieves details of a specific exchange.
   * @param {string} id - The ID of the exchange.
   * @returns {Promise<Object>} The exchange details.
   */
  getExchangeDetails: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export default exchangeService;