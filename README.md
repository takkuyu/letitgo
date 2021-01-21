# Letitgo 

#### A marketplace platform where a user can sell anything and message the seller/buyer in real-time.

- **Client** built with React, Context API, Apollo Client, Sass/scss, and Bootstrap4
- **Server** built with Node.js, GraphQL, Apollo Server, WebSocket, JSON Web Token, and PostgreSQL
- **Deployed** using AWS EC2 instance and Nginx

## Features
- A real-time messaging system between users using React.js and Apollo Client with WebSocket
- Written in modern React, only functional components with hooks
- Designed using Figma, and turned the design files into mobile-friendly pages
- Managed complex global states using React Context API
- Explored and implemented a GraphQL API with Apollo Server and PostgreSQL with the goal of providing single endpoints for data
- User authentication using JSON Web Tokens with GraphQL API
- Deployed the app using AWS EC2 instance and Nginx

## User Level Features
- Login or logout
- Sell an item
- Edit or delete an item a user posted
- Filter items by price, condition, and shipping fee
- Start chatting with a seller from an item page
- Real-time chat with a seller/buyer
- Add an item to wish list
- Remove an item from wish list
- View all the items a user posted and liked

## What I Learned
- How to fetch data using GraphQL Queries with React and Apollo Client
- Benefits of a Schema & Type System of GraphQL
- How to manage global state on front-end using React Context API
- Written in modern React, only functional components with hooks
- Benefits of using GraphQL API with Apollo Server compared with REST API
- How to implement real-time communiation between front-end and back-end using WebSocket
- How to deploy the full-stack app using AWS EC2 instance

## Setup and Running
- Prerequisites
  - Node
  - PostgreSQL
- Clone repo `git@github.com:takkuyu/letitgo.git`
- Server
  - Copy `.env.example` to `.env` for database credentials and JWT access token
  - Run `npm install`
  - Go to `client/src/graphql/ApolloProvider.js` and change apollo client httpLink uri to http://localhost:4000 (for websocket link, ws://localhost:4000)
- React Client
  - Go to `/client` directory
  - Run `npm install`
- Development
  - Run Server with `npm run dev`, server running at http://localhost:4000
  - Run Client with `npm start`, browse webapp at http://localhost:3000/

## Screenshots
![Letitgo](https://i.ibb.co/MDtfMks/vertical-1.png)

![Letitgo](https://i.ibb.co/VH6z7Vc/vertical-2.png)

![Letitgo](https://i.ibb.co/Pz6jPzP/wide-1.png)

## Developer
- Takaya Hirose - [GitHub](https://github.com/takkuyu) · [LinkedIn](https://www.linkedin.com/in/takaya-hirose-685632196/)

## License
Copyright (c) 2021 Takaya Hirose https://github.com/takkuyu

