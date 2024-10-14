import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const profileService = {
  /**
   * Retrieves the user's profile
   * @returns {Promise<Object>} User profile data
   * @throws {Error} If retrieval fails
   */
  async getProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Updates the user's profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user profile data
   * @throws {Error} If update fails
   */
  async updateProfile(profileData) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
  },

  /**
   * Updates the user's profile picture
   * @param {File} file - The new profile picture file
   * @returns {Promise<Object>} Updated profile picture data
   * @throws {Error} If update fails
   */
  async updateProfilePicture(file) {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('profilePicture', file);
    const response = await axios.put(`${API_URL}/profile/picture`, formData, {
      headers: { 
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  /**
   * Deletes the user's account
   * @param {string} password - User's current password for confirmation
   * @returns {Promise<Object>} Deletion confirmation message
   * @throws {Error} If deletion fails
   */
  async deleteAccount(password) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.delete(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { password }
    });
    return response.data;
  }
};

export default profileService;