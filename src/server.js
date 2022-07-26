import { ApolloServer, gql } from "apollo-server";

//define GraphQL schema
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

//define resolver
// set value to typeDefs
const resolvers = {
  Query: {
    info: () => "HackerNewsClone",
  },
};
