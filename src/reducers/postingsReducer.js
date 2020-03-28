const postingsReducer = (state = [], action={}) => {
    switch (action.type) {
        case 'STORE_POSTINGS':
            return action.payload;
        case 'STORE_POSTINGS_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export default postingsReducer;