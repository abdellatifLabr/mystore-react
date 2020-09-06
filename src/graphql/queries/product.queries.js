import { gql } from '@apollo/client';

export const PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      pk
      id
      name
      description
      unitsLeft
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
  query Products($storeId: ID, $searchTerm: String) {
    products(
      store_Id: $storeId, 
      name_Icontains: $searchTerm
    ) {
      edges {
        node {
          pk
          id
          name
          unitsLeft
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