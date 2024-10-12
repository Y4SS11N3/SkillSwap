import {
    FETCH_SKILLS_REQUEST,
    FETCH_SKILLS_SUCCESS,
    FETCH_SKILLS_FAILURE,
    FETCH_USER_SKILLS_REQUEST,
    FETCH_USER_SKILLS_SUCCESS,
    FETCH_USER_SKILLS_FAILURE,
    ADD_SKILL_REQUEST,
    ADD_SKILL_SUCCESS,
    ADD_SKILL_FAILURE
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
            knownSkills: action.payload.isKnownSkill
              ? [...state.userSkills.knownSkills, action.payload]
              : state.userSkills.knownSkills,
            interestedSkills: action.payload.isInterestedSkill
              ? [...state.userSkills.interestedSkills, action.payload]
              : state.userSkills.interestedSkills
          }
        };
      case FETCH_SKILLS_FAILURE:
      case FETCH_USER_SKILLS_FAILURE:
      case ADD_SKILL_FAILURE:
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