const postingsReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_POSTINGS':
            return action.payload;
        default:
            return state;
    }
}

export default postingsReducer;