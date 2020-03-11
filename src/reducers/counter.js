// const initialState = {
//     id: ''
// }

const idReducer = (state = '', action ={}) => {
    switch (action.type) {
        case 'REGISTER_ID':
            // return Object.assign({}, state, { id: action.payload });
            return action.payload;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export default idReducer;