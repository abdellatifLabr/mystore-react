import { gql } from '@apollo/client';

export const STORES = gql`
  query {
    stores {
      edges {
        node {
          id
          pk
          name
          description
          cover {
            original
          }
          logo {
            original
          }
        }
      }
    }
  }
`;

export const SUBSCRIPTION = gql`
  query Subscription($storeId: ID!) {
    subscriptions(store_Id: $storeId) {
      edges {
        node {
          pk
          id
          store {
            id
          }
        }
      }
    }
  }
`;