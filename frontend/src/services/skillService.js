import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const skillService = {
  getAllSkills: async () => {
    const response = await axios.get(`${API_URL}/skills/all`);
    return response.data;
  },

  getUserSkills: async () => {
    const response = await axios.get(`${API_URL}/skills/user`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  },

  addKnownSkill: async (skillId, proficiency) => {
    const response = await axios.post(`${API_URL}/skills/user/known/add`, 
      { skillId, proficiency },
      { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } }
    );
    return response.data;
  },

  deleteKnownSkill: async (skillId) => {
    const response = await axios.delete(`${API_URL}/skills/user/known/${skillId}`, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  },

  addInterestedSkill: async (skillId) => {
    const response = await axios.post(`${API_URL}/skills/user/interested/add`, 
      { skillId },
      { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` } }
    );
    return response.data;
  },

  createSkill: async (skillData) => {
    const response = await axios.post(`${API_URL}/skills/create`, skillData, {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    });
    return response.data;
  }
};

export default skillService;