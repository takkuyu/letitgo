import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    postsOverview: [Post!]!
    postsByCategory (category: String!): [Post!]!
    messages: [Message!]
    getRooms (uid: String!): [Room!]!
    getMessages (rid: String!): [Message!]!
    getWishList (uid: String!): [Post!]!
    getPostsByUser (uid: String!): [Post!]!
    getPost (pid: String!): Post!
  }

  type User {
    uid: ID!
    username: String!
    email: String!
    password: String!
    picture: String!
    created: String!
    token: String
    wishlist: [String!]!
  }

  type Post {
    pid:  ID!
    createdby: User!
    title:  String!
    category: String!
    location:  String!
    price:  Int!
    condition:  String!
    imageurl:  String!
    description:  String!
    created: String!
    shipping: Boolean!
  }

  type Room {
    rid: ID!
    from: User!
    to: User!
    post: Post
    latestMessage: String
  }

  type Message {
    mid: ID!
    room: String!
    from:String!
    to:String!
    content: String!
    created: String!
  }

  type Subscription {
    newMessage: Message!
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!,
      picture: String!
    ): User!,
    login(
      email: String!,
      password: String!,
    ): User!,
    loadUser: User!,
    createPost(
      createdby: String!
      title:  String!
      category: String!
      location:  String!
      price:  Int!
      condition:  String!
      imageurl:  String!
      description:  String!
      shipping:  Boolean!
    ): Post!,
    editPost(
      pid:  String!
      title:  String!
      price:  Int!
      category: String!
      condition:  String!
      location:  String!
      imageurl:  String!
      description:  String!
      shipping:  Boolean!
    ): Post!,
    createRoom(to: String!, post: String! ): Room!,
    postMessage(room: String!, to: String!, content: String!): Message!,
    updateWishList(uid: String!, updatedWishList: [String!]!): User!,
    deletePost(pid: String!): Post!
  }
`;
