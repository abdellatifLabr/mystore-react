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
      subscribersCount
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
      user {
        pk
        id
      }
      subscriptions {
        edges {
          node {
            user {
              pk
              id
              firstName
              lastName
              profile {
                avatar {
                  original
                }
              }
            }
          }
        }
      }
      discountCodes {
        edges {
          node {
            pk
            id
            code
            value
            expiry
            expired
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

export const MY_SUBSCRIPTIONS = gql`
  query {
    mySubscriptions {
      edges {
        node {
          store {
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
  }
`;