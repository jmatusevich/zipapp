import { ApolloServer } from "apollo-server";

import typeDefs from "./schema";
export const server = new ApolloServer({
    typeDefs
});

const port = 3000;

server.listen({port}).then(({ url }) => {
    console.log(`GraphQL sever available at ${url}`);
});