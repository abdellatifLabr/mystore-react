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

export const STORE = gql`
  query Store($id: ID!) {
    store(id: $id) {
      pk
      id
      name
      description
      logo {
        original
      }
      cover {
        original
      }
      closed
      products {
        edges {
          node {
            pk
            id
            name
            unitsLeft
            pictures {
              original
            }
            price {
              value
            }
            store {
              pk
              id
              name
            }
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