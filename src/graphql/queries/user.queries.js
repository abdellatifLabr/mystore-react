import { gql } from '@apollo/client';

export const ME = gql`
  query {
    me {
      id
      pk
      firstName
      lastName
      username
      email
      verified
    }
  }
`;