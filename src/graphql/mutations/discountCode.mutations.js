import { gql } from '@apollo/client';

export const CREATE_DISCOUNT_CODE = gql`
  mutation CreateDiscountCode(
    $storeId: ID!,
    $code: String!,
    $value: Int!,
    $expiry: DateTime!
  ) {
    createDiscountCode(
      input: {
        storeId: $storeId,
        code: $code,
        value: $value,
        expiry: $expiry
      }
    ) {
      success
      errors
      discountCode {
        pk
        id
        code
        value
        expiry
        expired
      }
    }
  }
`;

export const DELETE_DISCOUNT_CODE = gql`
  mutation DeleteDiscountCode($id: ID!) {
    deleteDiscountCode(
      input: {
        id: $id
      }
    ) {
      success
      errors
    }
  }
`;