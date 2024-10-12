import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import skillReducer from './reducers/skillReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
  },
});