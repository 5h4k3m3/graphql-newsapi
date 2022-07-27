const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const links = [
  {
    id: "link-0",
    description: "Learn GraphQL",
    url: "www.graphql-tutorial.com",
  },
];

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
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Start the server at ${url}`));
