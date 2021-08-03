import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: window._env_ ? window._env_.API_HOST : 'https://securitize-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
