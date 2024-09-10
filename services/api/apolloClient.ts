import { ApolloClient, InMemoryCache } from "@apollo/client";

const createClient = () => {
  return new ApolloClient({
    uri: "https://api.dogfood.cycle.app/graphql",
    cache: new InMemoryCache(),
  });
};

export const client = createClient;
