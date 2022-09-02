import { ApolloServer } from "apollo-server";
import { ZipAPIDataSource } from "./datasources/zipAPI/ZipAPIDataSource";
import resolvers from "./resolvers";
import typeDefs from "./schema";
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    zipAPI: new ZipAPIDataSource(),
  }),
});

const port = 3000;

server.listen({ port }).then(({ url }) => {
  console.log(`GraphQL sever available at ${url}`);
});
