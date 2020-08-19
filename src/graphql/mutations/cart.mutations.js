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
          description
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

export const UPDATE_CART_PRODUCT = gql`
  mutation UpdateCartProduct(
    $cartProductId: ID!,
    $quantity: Int
  ) {
    updateCartProduct(
      input: {
        cartProductId: $cartProductId,
        quantity: $quantity
      }
    ) {
      success
      cartProduct {
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
`;

export const DELETE_ALL_CART_PRODUCTS = gql`
  mutation DeleteAllCartProducts {
    deleteAllCartProducts(input: {}) {
      success
    }
  }
`;