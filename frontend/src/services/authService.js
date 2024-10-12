import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async signup(username, email, password) {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default authService;