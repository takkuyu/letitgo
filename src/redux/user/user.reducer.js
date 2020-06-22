import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  current_userid: '',
  this_userid: '',
  this_username: '',
  this_user_email: '',
  this_user_picture: '',
  new_username: '',
  new_user_email: '',
  new_user_picture: '',
  createdAt: '',
}

const userReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
      case 'STORE_CURRENT_USER_ID':
          return Object.assign({}, state, { current_userid: action.payload });
      case 'STORE_USER_ID':
          return Object.assign({}, state, { this_userid: action.payload });
      case 'STORE_USER_NAME':
          return Object.assign({}, state, { this_username: action.payload });
      case 'STORE_USER_EMAIL':
          return Object.assign({}, state, { this_user_email: action.payload });
      case 'STORE_USER_PICTURE':
          return Object.assign({}, state, { this_user_picture: action.payload });
      case 'STORE_NEW_USER_NAME':
          return Object.assign({}, state, { new_username: action.payload });
      case 'STORE_NEW_USER_EMAIL':
          return Object.assign({}, state, { new_user_email: action.payload });
      case 'STORE_NEW_USER_PICTURE':
          return Object.assign({}, state, { new_user_picture: action.payload });
      case 'STORE_CREATED_AT':
          return Object.assign({}, state, { createdAt: action.payload });
      default:
          return state;
  }
}

export default userReducer;
