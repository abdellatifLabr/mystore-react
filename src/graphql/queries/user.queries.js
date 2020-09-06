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
        phone
        bio
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

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      pk
      firstName
      lastName
      email
      verified
      profile {
        phone
        bio
        avatar {
          original
        }
      }
    }
  }
`;