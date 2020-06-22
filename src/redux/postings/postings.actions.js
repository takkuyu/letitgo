// import ShopActionTypes from './shop.types';
import axios from 'axios';
import {storeCurrentUserId} from '../user/user.actions';

// FOR POSTINGS REDUCER
export const storePostings = (postings) => {
  return {
      type: 'STORE_POSTINGS',
      payload: postings
  }
};
export const changeCreatedAt = (postings) => {
  return {
      type: 'CHANGE_CREATED_AT',
      payload: postings
  }
};


// *FOP ASYNC ACTIONS*
//Use high order function
export const requestPostingById = (id) => (dispatch) => {
    axios.get("http://localhost:3000/postings/" + id, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
        .then((res) => {
            dispatch({
                type: 'STORE_POSTINGS_SUCCESS',
                payload: res.data.posting
            })
            dispatch(storeCurrentUserId(res.data.userid))
            dispatch(changeCreatedAt(String(new Date(res.data.posting.createdAt)).substring(0, 15)))
            return res.data.posting.comments;
        }).catch((err) => { window.location = '/' })
}