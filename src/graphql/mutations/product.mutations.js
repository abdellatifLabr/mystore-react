import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!,
    $name: String,
    $description: String,
    $quantity: Int,
    $price: Decimal,
    $pictures: [Upload]
  ) {
    updateProduct(
      input: {
        id: $id,
        name: $name,
        description: $description,
        quantity: $quantity,
        price: $price,
        pictures: $pictures
      }
    ) {
      success
      errors
      product {
        pk
        id
      }
    }
  }
`;