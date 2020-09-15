import { gql } from '@apollo/client';

export const PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      pk
      id
      name
      description
      unitsLeft
      rating
      ratingsCount
      pictures {
        edges {
          node {
            original
          }
        }
      }
      price
      store {
        pk
        id
        name
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
`;

export const PRODUCTS = gql`
  query Products(
    $storeId: ID, 
    $name: String, 
    $orderBy: String,
    $count: Int,
    $after: String,
    $before: String
  ) {
    products(
      store_Id: $storeId, 
      name_Icontains: $name,
      orderBy: $orderBy,
      first: $count,
      after: $after,
      before: $before
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          pk
          id
          name
          unitsLeft
          rating
          pictures {
            edges {
              node {
                original
              }
            }
          }
          price
          store {
            pk
            id
            name
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