import {
    FETCH_SKILLS_REQUEST,
    FETCH_SKILLS_SUCCESS,
    FETCH_SKILLS_FAILURE,
    FETCH_USER_SKILLS_REQUEST,
    FETCH_USER_SKILLS_SUCCESS,
    FETCH_USER_SKILLS_FAILURE,
    ADD_SKILL_REQUEST,
    ADD_SKILL_SUCCESS,
    ADD_SKILL_FAILURE,
    DELETE_SKILL_REQUEST,
    DELETE_SKILL_SUCCESS,
    DELETE_SKILL_FAILURE
  } from '../actions/skillActions';
  
  const initialState = {
    skills: [],
    userSkills: {
      knownSkills: [],
      interestedSkills: []
    },
    loading: false,
    error: null
  };
  
  const skillReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SKILLS_REQUEST:
      case FETCH_USER_SKILLS_REQUEST:
      case ADD_SKILL_REQUEST:
      case DELETE_SKILL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_SKILLS_SUCCESS:
        return {
          ...state,
          loading: false,
          skills: action.payload
        };
      case FETCH_USER_SKILLS_SUCCESS:
        return {
          ...state,
          loading: false,
          userSkills: action.payload
        };
      case ADD_SKILL_SUCCESS:
        return {
          ...state,
          loading: false,
          userSkills: {
            ...state.userSkills,
            knownSkills: [
                ...state.userSkills.knownSkills,
                {
                 skillId: action.payload.skillId,
                 Skill: state.skills.find(s => s.id === action.payload.skillId),
                 proficiency: action.payload.proficiency,
                }
            ]
          }
        };
      case DELETE_SKILL_SUCCESS:
        return {
          ...state,
          loading: false,
          userSkills: {
            ...state.userSkills,
            knownSkills: state.userSkills.knownSkills.filter(skill => skill.skillId !== action.payload)
          }
        };
      case FETCH_SKILLS_FAILURE:
      case FETCH_USER_SKILLS_FAILURE:
      case ADD_SKILL_FAILURE:
      case DELETE_SKILL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default skillReducer;