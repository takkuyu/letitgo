import PosttingsActionTypes from './postings.types';

const INITIAL_STATE = {
    posts: null,
    isLoading: true,
    errorMessage: undefined,
    filter: {}
};

const postingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PosttingsActionTypes.STORE_POSTINGS:
            return action.payload;
        case PosttingsActionTypes.FETCH_POSTINGS_START:
            return {
                ...state,
                isFetching: true
            };
        case PosttingsActionTypes.FETCH_POSTINGS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
        case PosttingsActionTypes.FETCH__POSTINGS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };
        case PosttingsActionTypes.STORE_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        // case PosttingsActionTypes.CHANGE_CREATED_AT:
        //     return Object.assign({}, state, { createdAt: action.payload });
        default:
            return state;
    }
}

export default postingsReducer;
