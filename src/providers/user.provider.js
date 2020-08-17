import * as jwt_decode from 'jwt-decode';

import apollo from '../graphql';
import * as mutations from '../graphql/mutations/user.mutations';
import * as queries from '../graphql/queries/user.queries';

class UserProvider {
  async signUp(user) {
    let res = await apollo.mutate({
      mutation: mutations.SIGN_UP,
      variables: { ...user }
    });
    let data = res.data.register;

    if (data.success) {
      localStorage.setItem('access', data.token);
      localStorage.setItem('refresh', data.refreshToken);
    }

    return data;
  }

  async me() {
    let res = await apollo.query({
      query: queries.ME
    });
    return res.data.me;
  }

  isTokenExpired(token) {
    let decoded = jwt_decode(token);
    let currentTime = new Date().getTime() / 1000;
    return currentTime > decoded.exp;
  }

  async refreshToken() {
    let refresh = localStorage.getItem('refresh');
    let res = await apollo.mutate({
      mutation: mutations.REFRESH_TOKEN,
      variables: { refresh }
    });
    return res.data.refreshToken;
  }

}

export default new UserProvider();