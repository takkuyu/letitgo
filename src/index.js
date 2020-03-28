import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { allReducers } from './allReducers'
import { compose } from 'redux';
import { Provider } from 'react-redux'; // connect store to my app
import thunkMiddleware from 'redux-thunk';

// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {PersistGate} from 'redux-persist/integration/react';
// const persistConfig ={
//     key:'root',
//     storage,
//     whitelist:['userid']
// }
// const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(
    allReducers,
    compose(
        applyMiddleware(
            thunkMiddleware,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>
    , document.getElementById('root'));


