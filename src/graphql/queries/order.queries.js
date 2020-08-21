import { gql } from '@apollo/client';

export const DISCOUNT_CODE = gql`
  query DiscountCode($code: String!) {
    discountCodes(code: $code) {
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
`;

export const ORDER = gql`
  query Order($id: ID!) {
    order(id: $id) {
      pk
      id
      done
      total
      updated
      billingAddress {
        pk
        id
        country
        city
        street
        postalCode
      }
      shippingAddress {
        pk
        id
        country
        city
        street
        postalCode
      }
      discountCodes {
        edges {
          node {
            pk
            id
            code
            value
            store {
              name
            }
          }
        }
      }
      items {
        edges {
          node {
            pk
            id
            quantity
            cost
            product {
              name
              price {
                value
                currency
              }
              store {
                pk
                id
              }
            }
          }
        }
      }
    }
  }
`;
