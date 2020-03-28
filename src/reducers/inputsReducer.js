const initialState = {
    searchfield: '',
    title: '',
    price: '',
}

const inputsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_SEARCHFIELD':
            return Object.assign({}, state, { searchfield: action.payload });
        default:
            return state;
    }
}

export default inputsReducer;