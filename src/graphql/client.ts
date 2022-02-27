import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql/v1",
});
const cache = new InMemoryCache();
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});