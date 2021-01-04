import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './scss/styles.scss';
import { ApolloClient, gql, ApolloProvider, createHttpLink, split } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context';
import { cache } from './graphql/cache';

import { MessageProvider } from './context/message'
import { AuthProvider } from './context/auth';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isLoginModalOpen: Boolean!
  }
`;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: cache,
  typeDefs,
  resolvers: {},
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
