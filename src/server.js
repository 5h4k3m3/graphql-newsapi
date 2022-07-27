const { ApolloServer, gql } = require("apollo-server");

const links = [
  {
    id: "link-0",
    description: "Learn GraphQL",
    url: "www.graphql-tutorial.com",
  },
];

//define GraphQL schema
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

//define resolver
// set value to typeDefs
const resolvers = {
  Query: {
    info: () => "HackerNewsClone",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Start the server at ${url}`));
