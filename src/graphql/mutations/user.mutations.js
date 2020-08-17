import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!,
    $lastName: String!,
    $email: String!, 
    $username: String!,
    $password1: String!,
    $password2: String!
  ) {
    register(
      firstName: $firstName,
      lastName: $lastName,
      email: $email, 
      username: $username, 
      password1: $password1,
      password2: $password2
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refresh: String!) {
    refreshToken(refreshToken: $refresh) {
      token
      success
      errors
    }
  }
`;
