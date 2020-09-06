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
      store {
        pk
        id
        shipping
        name
        logo {
          original
        }
      }
      user {
        firstName
        lastName
        email
        profile {
          avatar {
            original
          }
        }
      }
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
              pk
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const ORDERS = gql`
  query Orders($storeId: ID!) {
    orders(store_Id: $storeId) {
      edges {
        node {
          pk
          id
          done
          total
          created
          billingAddress {
            countryName
            city
          }
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
  }
`;

export const MY_ORDERS = gql`
  query myOrders {
    myOrders {
      edges {
        node {
          pk
          id
          done
          total
          created
          billingAddress {
            countryName
            city
          }
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
  }
`;
