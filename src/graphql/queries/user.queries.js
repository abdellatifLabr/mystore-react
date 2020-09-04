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
      profile {
        avatar {
          original
        }
      }
    }
  }
`;

export const MY_PROFILE = gql`
  query {
    myProfile {
      pk
      id
      bio
      avatar {
        original
        width
        height
      }
      phone
    }
  }
`;