import { gql } from '@apollo/client';

export const CREATE_CART_PRODUCT = gql`
  mutation AddProductToCart($productId: ID!) {
    createCartProduct(
      input: {
        productId: $productId
      }
    ) {
      cartProduct {
        pk
        id
        quantity
        product {
          pk
          id
          name
          unitsLeft
          pictures {
            original
          }
          price {
            value
            currency
          }
        }
      }
      success
    }
  }
`;

export const DELETE_CART_PRODUCT = gql`
  mutation RemoveProductFromCart($productId: ID!) {
    deleteCartProduct(
      input: {
        productId: $productId
      }
    ) {
      success
    }
  }
`;
