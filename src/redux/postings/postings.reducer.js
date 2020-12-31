import PosttingsActionTypes from './postings.types';

const INITIAL_STATE = {
  posts: null,
  errorMessage: undefined,
  isFetching: false,
  filter: {},
};

const postingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PosttingsActionTypes.STORE_POSTINGS:
      return action.payload;
    case PosttingsActionTypes.FETCH_POSTINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PosttingsActionTypes.FETCH_POSTINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    case PosttingsActionTypes.FETCH_POSTINGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PosttingsActionTypes.STORE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    // case PosttingsActionTypes.CHANGE_CREATED_AT:
    //     return Object.assign({}, state, { createdAt: action.payload });
    default:
      return state;
  }
};

export default postingsReducer;
