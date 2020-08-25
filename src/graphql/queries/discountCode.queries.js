import { gql } from '@apollo/client';

export const DISCOUNT_CODE = gql`
  query DiscountCode(
    $code: String!,
    $storeId: ID!
  ) {
    discountCodes(code: $code, store_Id: $storeId) {
      edges {
        node {
          pk
          id
          code
          value
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