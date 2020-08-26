import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import userProvider from '../providers/user.provider';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
});

const authLink = setContext(async (req, { headers }) => {
  let currToken = localStorage.getItem('access');

  if (!currToken) return;
  if (req.operationName === 'RefreshToken') return;

  if (userProvider.isTokenExpired(currToken)) {
    try {
      let { success, token } = await userProvider.refreshToken()

      if (success) {
        localStorage.setItem('access', token);
        currToken = token;
      }
    } catch (error) {
      userProvider.signOut();
    }
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${currToken}`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
