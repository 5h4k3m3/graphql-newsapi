const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils.js");

const Query = require("./resolvers/Query.js");
const Mutation = require("./resolvers/Mutation.js");
const Subscription = require("./resolvers/Subscription.js");
const Link = require("./resolvers/Link.js");
const User = require("./resolvers/User.js");
const Vote = require("./resolvers/Vote.js");

// subscribe
const { PubSub } = require("apollo-server");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const pubsub = new PubSub();

//define resolver
// set value to typeDefs
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Start the server at ${url}`));
