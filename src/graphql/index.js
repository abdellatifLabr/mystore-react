import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import userProvider from '../providers/user.provider';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
});

const authLink = setContext(async (req, { headers }) => {
  let token = localStorage.getItem('access');

  if (!token) return;
  if (req.operationName === 'RefreshToken') return;

  if (userProvider.isTokenExpired(token)) {
    let data = await userProvider.refreshToken()

    if (data.success) {
      localStorage.setItem('access', data.token);
      token = data.token;
    }

    if (data.errors) {
      userProvider.signOut();
    }
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
