import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './scss/styles.scss';
import { ApolloClient, gql, ApolloProvider, useQuery } from '@apollo/client';
import { cache } from './cache';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isLoginModalOpen: Boolean!
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache,
  typeDefs,
  resolvers: {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
