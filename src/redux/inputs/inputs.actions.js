import axios from 'axios';

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
