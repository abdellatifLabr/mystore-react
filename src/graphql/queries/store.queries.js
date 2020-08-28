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
          closed
          shipping
          cover {
            original
          }
          logo {
            original
          }
          user {
            id
            pk
          }
        }
      }
    }
  }
`;

export const MY_STORES = gql`
  query MyStores {
    myStores {
      edges {
        node {
          pk
          id
          name
          description
          closed
          shipping
          cover {
            original
          }
          logo {
            original
          }
          user {
            pk
            id
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
      closed
      shipping
      logo {
        original
        width
        height
      }
      cover {
        original
        width
        height
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
              logo {
                original
              }
            }
          }
        }
      }
      user {
        pk
        id
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