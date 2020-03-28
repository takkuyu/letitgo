import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import postingsReducer from './reducers/postingsReducer';
import inputsReducer from './reducers/inputsReducer';



export const allReducers = combineReducers({
    user: userReducer,
    postings: postingsReducer,
    inputs: inputsReducer,
});