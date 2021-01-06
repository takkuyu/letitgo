const db = require('../../config/db')
const { withFilter, AuthenticationError } = require('apollo-server')

const NEW_MESSAGE = "NEW_MESSAGE"

module.exports = {
  Query: {
    getRooms: async (_, { uid }) => {
      // @TODO: Add created to sort by date for recent.
      const roomsByUser = await db("rooms").where("from", uid).orWhere("to", uid);
      return roomsByUser;
    },
    getMessages: async (_, { rid }) => {
      try {
        const messages = await db("messages").where("room", rid).orderBy("created", 'asc');
        return messages;
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    messages: () => messages,
  },
  Mutation: {
    postMessage: async (_, { room, to, content }, { user, pubsub }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')

        const [message] = await db("messages")
          .returning("*")
          .insert({
            room,
            from: user.uid,
            to,
            content,
            created: new Date()
          });

        pubsub.publish(NEW_MESSAGE, {
          newMessage: message
        })

        return message;
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    createRoom: async (_, { to, post }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')
        const [room] = await db("rooms")
          .returning("*")
          .insert({
            from: user.uid,
            to,
            post,
          });
        return room
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub, user }) => {
          if (!user) throw new AuthenticationError('Unauthenticated')
          return pubsub.asyncIterator(NEW_MESSAGE)
        },
        ({ newMessage }, _, { user }) => {
          if (
            newMessage.from === String(user.uid) ||
            newMessage.to === String(user.uid)
          ) {
            return true
          }
          return false
        }
      ),
    },
  },
}
