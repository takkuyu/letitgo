const initialState = {
  searchfield: '',
  title: '',
  location: '',
  price: 0,
  image: '',
  condition: '',
  description: '',
  loading: false,
  errorInputs: false,
  comment: '',
};

const inputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_SEARCHFIELD':
      return Object.assign({}, state, { searchfield: action.payload });
    case 'STORE_TITLE':
      return Object.assign({}, state, { title: action.payload });
    case 'STORE_PRICE':
      return Object.assign({}, state, { price: action.payload });
    case 'STORE_LOCATION':
      return Object.assign({}, state, { location: action.payload });
    case 'STORE_IMAGE':
      return Object.assign({}, state, { image: action.payload });
    case 'STORE_CONDITION':
      return Object.assign({}, state, { condition: action.payload });
    case 'STORE_DESCRIPTION':
      return Object.assign({}, state, { description: action.payload });
    case 'STORE_LOADING':
      return Object.assign({}, state, { loading: action.payload });
    case 'CHECK_ERROR＿INPUT':
      return Object.assign({}, state, { errorInputs: action.payload });
    case 'STORE_COMMENT':
      return Object.assign({}, state, { comment: action.payload });
    default:
      return state;
  }
};

export default inputsReducer;
