const db = require('../../config/db')
const { AuthenticationError } = require('apollo-server')
const categories = require('../../constants/constants')

module.exports = {
  Query: {
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
    getPostsByUser: async (_, { uid }) => {
      try {
        const posts = await db("posts").where("createdby", uid).orderBy("created", 'asc');
        return posts
      } catch (err) {
        throw err
      }
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      const [post] = await db("posts")
        .returning("*")
        .insert({
          ...args,
          created: new Date()
        });
      return post;
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
}
