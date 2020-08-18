import { gql } from '@apollo/client';

export const CART_PRODUCTS = gql`
  query CartProducts($userId: ID!) {
    cartProducts(user_Id: $userId) {
      edges {
        node {
          pk
          id
          quantity
          cost
          product {
            pk
            id
            name
            description
            price {
              value
              currency
            }
            pictures {
              original
            }
            store {
              id
              pk
              name
            }
          }
        }
      }
    }
  }
`;