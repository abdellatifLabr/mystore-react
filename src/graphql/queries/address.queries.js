import { gql } from '@apollo/client';

export const MY_ADDRESSES = gql`
  query MyAddresses {
    myAddresses {
      edges {
        node {
          pk
          id
          formatted
        }
      }
    }
  }
`;