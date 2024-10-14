import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Service for handling authentication operations
 */
const authService = {
  /**
   * Logs in a user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data including token
   * @throws {Error} If login fails
   */
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },


  /**
   * Signs up a new user
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data including token
   * @throws {Error} If signup fails
   */
  async signup(name, email, password) {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Logs out the current user
   */
  logout() {
    localStorage.removeItem('user');
  },

  /**
   * Gets the current logged-in user
   * @returns {Object|null} Current user data or null if not logged in
   */
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default authService;