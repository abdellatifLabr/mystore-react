import { gql } from '@apollo/client';

export const CART_PRODUCTS = gql`
  query CartProducts {
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
  }
`;

export const CARTS = gql`
  query GetCarts {
    carts {
      edges {
        node {
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
                cart {
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
  }
`;

export const CART = gql`
  query Cart($id: ID!) {
    cart(id: $id) {
      pk
      id
      total
      store {
        pk
        id
        name
        logo {
          original
        }
      }
      cartProducts {
        edges {
          node {
            pk
            id
            cost
            quantity
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
            }
          }
        }
      }
    }
  }
`;