import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const graphQLClient = new ApolloClient({
  uri: "/",
  cache: new InMemoryCache(),
});
