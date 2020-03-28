import axios from 'axios';

export const storeCurrentUserId = (id) => {
    return {
        type: 'STORE_CURRENT_USER_ID',
        payload: id
    }
};

export const storeUserId = (id) => {
    return {
        type: 'STORE_USER_ID',
        payload: id
    }
};

export const storeUsername = (id) => {
    return {
        type: 'STORE_USER_NAME',
        payload: id
    }
};

export const storeUserPic = (id) => {
    return {
        type: 'STORE_USER_PICTURE',
        payload: id
    }
};

export const storePostings = (postings) => {
    return {
        type: 'STORE_POSTINGS',
        payload: postings
    }
};

export const storeSearchField = (data) => {
    return {
        type: 'STORE_SEARCHFIELD',
        payload: data
    }
};

//Use high order function
export const requestPostings = () => (dispatch) => {
    return axios.get('http://localhost:3000/postings/', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
        .then((response) => {
            dispatch(storeCurrentUserId(response.data.userid))
            dispatch({
                type: 'STORE_POSTINGS_SUCCESS',
                payload: response.data.postings
            })
        }).catch((err) => {
             //If the token was deleted or does not exist, redirect to root 
            window.location = '/';
        })
}