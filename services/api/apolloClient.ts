import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.dogfood.cycle.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: process.env.GRAPHQL_AUTH_TOKEN,
    },
  };
});

const createClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const client = createClient;
