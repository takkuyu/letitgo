import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { allReducers } from './allReducers'
// import { compose } from 'redux';
import { Provider } from 'react-redux'; // connect store to my app
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const store = createStore(
    allReducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));


