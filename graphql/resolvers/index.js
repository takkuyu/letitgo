const userResolvers = require('./users')
const messageResolvers = require('./messages')
const postResolvers = require('./posts')
const db = require('../../config/db')

module.exports = {
  Post: {
    createdby: async root => {
      const [createdby] = await db("users").where("uid", root.createdby);
      return createdby;
    },
  },
  Room: {
    from: async root => {
      const [from] = await db("users").where("uid", root.from);
      return from;
    },
    to: async root => {
      const [to] = await db("users").where("uid", root.to);
      return to;
    },
    post: async root => {
      const [post] = await db("posts").where("pid", root.post);
      return post;
    },
    latestMessage: async root => {
      const [message] = await db("messages").where("room", root.rid).orderBy('created', 'desc').limit(1);
      if (!message) return "";

      return message.content;
    },
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...postResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
}
