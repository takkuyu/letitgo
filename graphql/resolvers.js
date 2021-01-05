import { categories } from "../constants/constants";
import db from "../config/db";
import jwt from 'jsonwebtoken';
import {
  AuthenticationError,
  withFilter,
} from 'apollo-server';

const NEW_MESSAGE = "NEW_MESSAGE"

export const resolvers = {
  Query: {
    users: async () => {
      const users = await db.select("*").from("users")
      return users;
    },
    getPost: async (_, { pid }) => {
      const [post] = await db("posts").where("pid", pid);
      return post;
    },
    postsOverview: async () => {
      let posts = [];
      for (const category in categories) {
        const postByCategory = await db("posts").where("category", categories[category]).orderBy("created", 'desc').limit(5);
        posts = [
          ...posts,
          ...postByCategory
        ]
      }
      return posts;
    },
    postsByCategory: async (_, { category }) => {
      const postByCategory = await db("posts").where("category", category).orderBy("created", 'desc');
      return postByCategory;
    },
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
    getWishList: async (_, { uid }) => {
      try {
        const [user] = await db("users").where("uid", uid);
        if (user) {
          const wishListItems = await db("posts").whereIn("pid", user.wishlist).orderBy("created", 'asc');
          return wishListItems
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    getPostsByUser: async (_, { uid }) => {
      try {
        const posts = await db("posts").where("createdby", uid).orderBy("created", 'asc');
        return posts
      } catch (err) {
        throw err
      }
    },
    messages: () => messages,
  },
  Mutation: {
    createUser: async (_, { username, email, password, picture }) => {
      const [user] = await db("users")
        .returning("*")
        .insert({
          username,
          email,
          password,
          picture,
          created: new Date()
        });
      return user;
    },
    login: async (_, { email, password }) => {
      const [user] = await db("users").where({ email: email, password: password });
      if (user) {
        const token = jwt.sign({ uid: user.uid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
        user.token = token;
        return user;
      }
    },
    loadUser: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        const [loadedUser] = await db("users").where("uid", user.uid);
        return loadedUser
      } catch (err) {
        throw err
      }
    },
    createPost: async (_, args) => {
      const [post] = await db("posts")
        .returning("*")
        .insert({
          ...args,
          created: new Date()
        });
      return post;
    },
    updateWishList: async (_, { uid, updatedWishList }) => {
      const [user] = await db('users')
        .returning("*")
        .where('uid', uid)
        .update({ wishlist: updatedWishList });
      return user
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
    editPost: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')
        const [post] = await db("posts").returning("*").where("pid", args.pid).update({
          title: args.title,
          price: args.price,
          category: args.category,
          condition: args.condition,
          location: args.location,
          imageurl: args.imageurl,
          description: args.description,
          shipping: args.shipping
        });
        return post;
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    deletePost: async (_, { pid }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated')
        const [post] = await db("posts").returning("*").where("pid", pid).del();
        return post;
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
  }
};
