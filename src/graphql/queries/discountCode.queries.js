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
          store {
            pk
            id
            name
          }
        }
      }
    }
  } 
`;