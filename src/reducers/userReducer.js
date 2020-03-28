const initialState = {
    current_userid: '',
    this_userid: '',
    this_username: '',
    userPic: ''
}

const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'STORE_CURRENT_USER_ID':
            return Object.assign({}, state, { current_userid: action.payload });
        case 'STORE_USER_ID':
            return Object.assign({}, state, { this_userid: action.payload });
        case 'STORE_USER_NAME':
            return Object.assign({}, state, { this_username: action.payload });
        case 'STORE_USER_PICTURE':
            return Object.assign({}, state, { userPic: action.payload });
        default:
            return state;
    }
}

export default userReducer;