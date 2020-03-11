import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
// import { allReducers } from '../src/reducers/index'
import { combineReducers } from 'redux';
import { Provider } from 'react-redux'; // connect store to my app

import idReducer from './reducers/counter';
import loggedReducer from './reducers/isLogged';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig ={
    key:'root',
    storage,
    whitelist:['userid']
}

const allReducers = combineReducers({
    userid: idReducer,
    isLogged: loggedReducer
});

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store ={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App /> 
        </PersistGate>
    </Provider>
    , document.getElementById('root'));


