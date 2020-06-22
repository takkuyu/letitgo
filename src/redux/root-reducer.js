import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import postingsReducer from './postings/postings.reducer';
import inputsReducer from './inputs/inputs.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  postings: postingsReducer,
  inputs: inputsReducer
});

export default rootReducer;
