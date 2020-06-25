import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import postingsReducer from './postings/postings.reducer';
import inputsReducer from './inputs/inputs.reducer';
import directoryReducer from './directory/directory.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  postings: postingsReducer,
  inputs: inputsReducer,
  directory: directoryReducer,
});

export default rootReducer;
