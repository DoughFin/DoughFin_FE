import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  // uri: "https://doughfin-be.onrender.com/graphql",
  uri: "http://localhost:3000/graphql"
});

const customHeaders = setContext((_, { headers }) => {
  return {
    headers: {
      "x-mock-match-request-body": true,
    },
  };
});

export const client = new ApolloClient({
  link: customHeaders.concat(httpLink),
  cache: new InMemoryCache(),
});