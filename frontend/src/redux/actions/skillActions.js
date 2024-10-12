import skillService from '../../services/skillService';

export const FETCH_SKILLS_REQUEST = 'FETCH_SKILLS_REQUEST';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAILURE = 'FETCH_SKILLS_FAILURE';

export const FETCH_USER_SKILLS_REQUEST = 'FETCH_USER_SKILLS_REQUEST';
export const FETCH_USER_SKILLS_SUCCESS = 'FETCH_USER_SKILLS_SUCCESS';
export const FETCH_USER_SKILLS_FAILURE = 'FETCH_USER_SKILLS_FAILURE';

export const ADD_SKILL_REQUEST = 'ADD_SKILL_REQUEST';
export const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS';
export const ADD_SKILL_FAILURE = 'ADD_SKILL_FAILURE';

export const fetchSkills = () => async (dispatch) => {
  dispatch({ type: FETCH_SKILLS_REQUEST });
  try {
    const skills = await skillService.getAllSkills();
    dispatch({ type: FETCH_SKILLS_SUCCESS, payload: skills });
  } catch (error) {
    dispatch({ type: FETCH_SKILLS_FAILURE, payload: error.message });
  }
};

export const fetchUserSkills = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_SKILLS_REQUEST });
  try {
    const userSkills = await skillService.getUserSkills();
    dispatch({ type: FETCH_USER_SKILLS_SUCCESS, payload: userSkills });
  } catch (error) {
    dispatch({ type: FETCH_USER_SKILLS_FAILURE, payload: error.message });
  }
};

export const addKnownSkill = (skillId, proficiency) => async (dispatch) => {
  dispatch({ type: ADD_SKILL_REQUEST });
  try {
    const newSkill = await skillService.addKnownSkill(skillId, proficiency);
    dispatch({ type: ADD_SKILL_SUCCESS, payload: newSkill });
  } catch (error) {
    dispatch({ type: ADD_SKILL_FAILURE, payload: error.message });
  }
};

export const addInterestedSkill = (skillId) => async (dispatch) => {
  dispatch({ type: ADD_SKILL_REQUEST });
  try {
    const newSkill = await skillService.addInterestedSkill(skillId);
    dispatch({ type: ADD_SKILL_SUCCESS, payload: newSkill });
  } catch (error) {
    dispatch({ type: ADD_SKILL_FAILURE, payload: error.message });
  }
};

export const createSkill = (skillData) => async (dispatch) => {
  dispatch({ type: ADD_SKILL_REQUEST });
  try {
    const newSkill = await skillService.createSkill(skillData);
    dispatch({ type: ADD_SKILL_SUCCESS, payload: newSkill });
  } catch (error) {
    dispatch({ type: ADD_SKILL_FAILURE, payload: error.message });
  }
};