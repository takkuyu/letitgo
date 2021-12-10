import React from 'react';
import {
  ApolloClient,
  gql,
  ApolloProvider as Provider,
  createHttpLink,
  split,
  InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isLoginModalOpen: Boolean!
  }
`;

let httpLink = createHttpLink({
  uri: 'https://letitgo-server.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

httpLink = authLink.concat(httpLink);

// const host = window.location.host;

const wsLink = new WebSocketLink({
  uri: `wss://letitgo-server.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {},
});

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />;
}
