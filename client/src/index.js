import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';

import { MessageProvider } from './context/message';
import { AuthProvider } from './context/auth';
import ApolloProvider from './graphql/ApolloProvider';

ReactDOM.render(
  <ApolloProvider>
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
