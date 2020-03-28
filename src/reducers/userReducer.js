const initialState = {
    id: '',
    username: '',
    userPic: ''
}

const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'STORE_ID':
            return Object.assign({}, state, { id: action.payload });
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export default userReducer;