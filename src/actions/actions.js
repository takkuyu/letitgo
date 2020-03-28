export const storeUserId = (id) => {
    return{
        type:'STORE_ID',
        payload: id
    }
};

export const storePostings = (postings) => {
    return{
        type:'STORE_POSTINGS',
        payload: postings
    }
};

export const storeSearchField = (data) => {
    return{
        type:'STORE_SEARCHFIELD',
        payload: data
    }
};