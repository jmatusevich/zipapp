import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphQLClient = new ApolloClient({
  uri: "/",
  cache: new InMemoryCache(),
});
