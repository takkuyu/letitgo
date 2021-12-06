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

apolloServer.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀  Subscription ready at ${subscriptionsUrl}`)
});