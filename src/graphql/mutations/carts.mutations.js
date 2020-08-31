import { gql } from '@apollo/client';

export const CREATE_CART_PRODUCT = gql`
  mutation AddProductToCart($productId: ID!) {
    createCartProduct(
      input: {
        productId: $productId
      }
    ) {
      success
      isNewCart
      cartProduct {
        pk
        id
        product {
          pk
          id
        }
        cart {
          pk
          id
        }
      }
      cart {
        pk
        id
        total
        cartProducts {
          edges {
            node {
              pk
              id
              product {
                pk
                id
              }
            }
          }
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
`;

export const DELETE_CART_PRODUCT = gql`
  mutation RemoveProductFromCart($cartProductId: ID!) {
    deleteCartProduct(
      input: {
        cartProductId: $cartProductId
      }
    ) {
      success
      isLastItem
      cart {
        pk
        id
        total
        cartProducts {
          edges {
            node {
              pk
              id
              quantity
              cost
              cart {
                pk
                id
              }
              product {
                pk
                id
                name
                description
                price
                pictures {
                  edges {
                    node {
                      original
                    }
                  }
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
      cart {
        pk
        id
        total
        cartProducts {
          edges {
            node {
              pk
              id
              quantity
              cost
              cart {
                pk
                id
              }
              product {
                pk
                id
                name
                description
                price
                pictures {
                  edges {
                    node {
                      original
                    }
                  }
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
`;

export const DELETE_ALL_CART_PRODUCTS = gql`
  mutation DeleteAllCartProducts {
    deleteAllCartProducts(input: {}) {
      success
    }
  }
`;

export const DELETE_CART = gql`
  mutation DeleteCart($cartId: ID!) {
    deleteCart(
      input: {
        cartId: $cartId
      }
    ) {
      success
      cart {
        pk
        id
      }
    }
  }
`;