import ShopActionTypes from './postings.types';

const postingsReducer = (state = [], action = {}) => {
    switch (action.type) {
        case ShopActionTypes.STORE_POSTINGS:
            return action.payload;
        case ShopActionTypes.STORE_POSTINGS_SUCCESS:
            return action.payload;
        case ShopActionTypes.CHANGE_CREATED_AT:
            return Object.assign({}, state, { createdAt: action.payload });
        default:
            return state;
    }
}

export default postingsReducer;
