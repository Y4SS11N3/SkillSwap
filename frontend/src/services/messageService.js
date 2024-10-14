import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/messages`;

const messageService = {
  /**
   * Retrieves messages for a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @returns {Promise<Array>} An array of message objects.
   */
  getMessages: async (exchangeId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${exchangeId}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Sends a new message in a specific exchange.
   * @param {string} exchangeId - The ID of the exchange.
   * @param {string} content - The content of the message.
   * @returns {Promise<Object>} The sent message data.
   */
  sendMessage: async (exchangeId, content) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(API_URL, { exchangeId, content }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  }
};

export default messageService;