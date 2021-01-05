const { ApolloServer } = require('apollo-server')

require('dotenv').config();

const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')
const contextMiddleware = require('./util/contextMiddleware')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
  subscriptions: { path: '/' },
});

apolloServer.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀  Susbscription ready at ${subscriptionsUrl}`)
});