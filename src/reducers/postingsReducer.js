const postingsReducer = (state = [], action={}) => {
    switch (action.type) {
        case 'STORE_POSTINGS':
            return action.payload;
        case 'STORE_POSTINGS_SUCCESS':
            return action.payload;
        case 'CHANGE_CREATED_AT':
            return Object.assign({}, state, { createdAt: action.payload });
        default:
            return state;
    }
}

export default postingsReducer;