import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authService = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async signup(name, email, password) {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
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