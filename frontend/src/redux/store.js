import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import skillReducer from './reducers/skillReducer';
import exchangeReducer from './reducers/exchangeReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    exchange: exchangeReducer,
  },
});