const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const db = require('../../config/db')

module.exports = {
  Query: {
    users: async () => {
      const users = await db.select("*").from("users")
      return users;
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
    updateWishList: async (_, { uid, updatedWishList }) => {
      const [user] = await db('users')
        .returning("*")
        .where('uid', uid)
        .update({ wishlist: updatedWishList });
      return user
    },
  },
}
