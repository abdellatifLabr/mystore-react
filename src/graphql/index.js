import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import userProvider from '../providers/user.provider';

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_API_GRAPHQL_ENDPOINT
});

const authLink = setContext(async (req, { headers }) => {
  let currToken = localStorage.getItem('access');

  if (!currToken) return;
  if (req.operationName === 'RefreshToken') return;

  if (userProvider.isTokenExpired(currToken)) {
    let { success, token, errors } = await userProvider.refreshToken()

    if (success) {
      localStorage.setItem('access', token);
      currToken = token;
    }
    
    if (errors) userProvider.signOut();
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${currToken}`
    }
  }
});

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions
});

export default client;
