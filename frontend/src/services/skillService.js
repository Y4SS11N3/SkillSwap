import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const skillService = {
  /**
   * Retrieves all available skills.
   * @returns {Promise<Array>} An array of all skill objects.
   */
  getAllSkills: async () => {
    const response = await axios.get(`${API_URL}/skills/all`);
    return response.data;
  },

  /**
   * Retrieves skills associated with the current user.
   * @returns {Promise<Array>} An array of user's skill objects.
   */
  getUserSkills: async () => {
    const response = await axios.get(`${API_URL}/skills/user`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  },

  /**
   * Adds a known skill for the current user.
   * @param {string} skillId - The ID of the skill to add.
   * @param {string} proficiency - The proficiency level of the skill.
   * @returns {Promise<Object>} The added skill data.
   */
  addKnownSkill: async (skillId, proficiency) => {
    const response = await axios.post(`${API_URL}/skills/user/known/add`, 
      { skillId, proficiency },
      { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } }
    );
    return response.data;
  },

  /**
   * Deletes a known skill for the current user.
   * @param {string} skillId - The ID of the skill to delete.
   * @returns {Promise<Object>} The result of the deletion operation.
   */
  deleteKnownSkill: async (skillId) => {
    const response = await axios.delete(`${API_URL}/skills/user/known/${skillId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  },

  /**
   * Adds an interested skill for the current user.
   * @param {string} skillId - The ID of the skill to add.
   * @returns {Promise<Object>} The added skill data.
   */
  addInterestedSkill: async (skillId) => {
    const response = await axios.post(`${API_URL}/skills/user/interested/add`, 
      { skillId },
      { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } }
    );
    return response.data;
  },

  /**
   * Creates a new skill.
   * @param {Object} skillData - The data for the new skill.
   * @returns {Promise<Object>} The created skill data.
   */
  createSkill: async (skillData) => {
    const response = await axios.post(`${API_URL}/skills/create`, skillData, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  }
};

export default skillService;