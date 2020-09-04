import * as jwt_decode from 'jwt-decode';

import apollo from '../graphql';
import * as mutations from '../graphql/mutations/user.mutations';
import * as queries from '../graphql/queries/user.queries';
import store from '../store';
import { setUser } from '../store/actions/user.actions';

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

  async signIn(username, password) {
    let res = await apollo.mutate({
      mutation: mutations.SIGN_IN,
      variables: { username, password }
    });
    let data = res.data.tokenAuth;

    if (data.success) {
      localStorage.setItem('access', data.token);
      localStorage.setItem('refresh', data.refreshToken);
    }

    return data; 
  }

  isAuthenticated() {
    return !!(localStorage.getItem('access') && localStorage.getItem('refresh'));
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

  async resendLink(email) {
    let res = await apollo.mutate({
      mutation: mutations.RESEND_VERIFICATION_EMAIL,
      variables: { email }
    });
    return res.data.resendActivationEmail;
  }

  async activate(token) {
    let res = await apollo.mutate({
      mutation: mutations.VERIFY_ACCOUNT,
      variables: { token }
    });
    return res.data.verifyAccount;
  }

  async signOut() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    store.dispatch(setUser(null));
  }

  async myProfile() {
    let res = await apollo.query({
      query: queries.MY_PROFILE
    });

    return res.data.myProfile;
  }

  async updateProfile(fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_PROFILE,
      variables: { ...fields },
      context: {
        useMultipart: true
      }
    });

    return res.data.updateProfile;
  }

}

export default new UserProvider();