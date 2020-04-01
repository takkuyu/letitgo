import axios from 'axios';

// FOR USER REDUCER
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
export const storeUsername = (name) => {
    return {
        type: 'STORE_USER_NAME',
        payload: name
    }
};
export const storeUserEmail = (email) => {
    return {
        type: 'STORE_USER_EMAIL',
        payload: email
    }
};
export const storeUserPic = (picture) => {
    return {
        type: 'STORE_USER_PICTURE',
        payload: picture
    }
};
export const storeNewUsername = (name) => {
    return {
        type: 'STORE_NEW_USER_NAME',
        payload: name
    }
};
export const storeNewUserEmail = (email) => {
    return {
        type: 'STORE_NEW_USER_EMAIL',
        payload: email
    }
};
export const storeNewUserPic = (picture) => {
    return {
        type: 'STORE_NEW_USER_PICTURE',
        payload: picture
    }
};
export const storeCreatedAt = (date) => {
    return {
        type: 'STORE_CREATED_AT',
        payload: date
    }
};


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


// FOR INPUTS REDUCER
export const storeSearchField = (data) => {
    return {
        type: 'STORE_SEARCHFIELD',
        payload: data
    }
};
export const storeTitle = (data) => {
    return {
        type: 'STORE_TITLE',
        payload: data
    }
};
export const storePrice = (data) => {
    return {
        type: 'STORE_PRICE',
        payload: data
    }
};
export const storeLocation = (data) => {
    return {
        type: 'STORE_LOCATION',
        payload: data
    }
};
export const storeImage = (data) => {
    return {
        type: 'STORE_IMAGE',
        payload: data
    }
};
export const storeCondition = (data) => {
    return {
        type: 'STORE_CONDITION',
        payload: data
    }
};
export const storeDescription = (data) => {
    return {
        type: 'STORE_DESCRIPTION',
        payload: data
    }
};
export const storeLoadning = (data) => {
    return {
        type: 'STORE_LOADING',
        payload: data
    }
};
export const checkErrorInput = (data) => {
    return {
        type: 'CHECK_ERROR＿INPUT',
        payload: data
    }
};
export const storeComment = (comment) => {
    return {
        type: 'STORE_COMMENT',
        payload: comment
    }
};


// *FOP ASYNC ACTIONS*

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
            //When the token is invalid or does not exist
            if (err.response.status === 403) {
                window.location = '/';
            } else {
                console.log(err)
            }
        })
}

export const requestInputs = (id) => (dispatch) => {
    axios.get('http://localhost:3000/postings/' + id, { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
        .then((response) => {
            dispatch(storeTitle(response.data.posting.title))
            dispatch(storePrice(response.data.posting.price))
            dispatch(storeCondition(response.data.posting.condition))
            dispatch(storeLocation(response.data.posting.location))
            dispatch(storeImage(response.data.posting.image))
            dispatch(storeDescription(response.data.posting.description))
        }).catch((err) => console.log(err))
}

export const requestUser = () => (dispatch) => {
    axios.get('http://localhost:3000/users/authenticate', { headers: { "Authorization": `Bearer ${sessionStorage.getItem('token')}` } })
        .then((res) => {
            dispatch(storeUsername(res.data.username))
            dispatch(storeUserEmail(res.data.email))
            dispatch(storeUserPic(res.data.picture))
            dispatch(storeNewUsername(res.data.username))
            dispatch(storeNewUserEmail(res.data.email))
            dispatch(storeNewUserPic(res.data.picture))
            dispatch(storeCreatedAt(String(new Date(res.data.createdAt)).substring(0, 15)))
        }).catch((err) => {
            //When the token is invalid or does not exist
            if (err.response.status === 403) {
                window.location = '/';
            } else {
                console.log(err)
            }
        })
}

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
