import { UserActionTypes } from './user.types';
import axios from 'axios';

// FOR USER REDUCER
export const storeCurrentUserId = (id) => {
  return {
    type: UserActionTypes.STORE_CURRENT_USER_ID,
    payload: id,
  };
};
export const storeUserId = (id) => {
  return {
    type: 'STORE_USER_ID',
    payload: id,
  };
};
export const storeUsername = (name) => {
  return {
    type: 'STORE_USER_NAME',
    payload: name,
  };
};
export const storeUserEmail = (email) => {
  return {
    type: 'STORE_USER_EMAIL',
    payload: email,
  };
};
export const storeUserPic = (picture) => {
  return {
    type: 'STORE_USER_PICTURE',
    payload: picture,
  };
};
export const storeNewUsername = (name) => {
  return {
    type: 'STORE_NEW_USER_NAME',
    payload: name,
  };
};
export const storeNewUserEmail = (email) => {
  return {
    type: 'STORE_NEW_USER_EMAIL',
    payload: email,
  };
};
export const storeNewUserPic = (picture) => {
  return {
    type: 'STORE_NEW_USER_PICTURE',
    payload: picture,
  };
};
export const storeCreatedAt = (date) => {
  return {
    type: 'STORE_CREATED_AT',
    payload: date,
  };
};

export const requestUser = () => (dispatch) => {
  axios
    .get('http://localhost:3000/users/authenticate', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
    .then((res) => {
      dispatch(storeUsername(res.data.username));
      dispatch(storeUserEmail(res.data.email));
      dispatch(storeUserPic(res.data.picture));
      dispatch(storeNewUsername(res.data.username));
      dispatch(storeNewUserEmail(res.data.email));
      dispatch(storeNewUserPic(res.data.picture));
      dispatch(
        storeCreatedAt(String(new Date(res.data.createdAt)).substring(0, 15))
      );
    })
    .catch((err) => {
      //When the token is invalid or does not exist
      if (err.response.status === 403) {
        window.location = '/';
      } else {
        console.log(err);
      }
    });
};
