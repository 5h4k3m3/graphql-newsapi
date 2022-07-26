const { ApolloServer, gql } = require("apollo-server");

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Start the server at ${url}`));
