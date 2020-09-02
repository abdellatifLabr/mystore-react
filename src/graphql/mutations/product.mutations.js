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

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $storeId: ID!,
    $name: String!,
    $description: String!,
    $pictures: [Upload]!,
    $quantity: Int!,
    $price: Decimal!
  ) {
    createProduct(
      input: {
        storeId: $storeId,
        name: $name,
        description: $description,
        pictures: $pictures,
        price: $price,
        quantity: $quantity
      }
    ) {
      success
      errors
      product {
        pk
        id
        name
        unitsLeft
        pictures {
          edges {
            node {
              original
            }
          }
        }
        price
        store {
          pk
          id
          name
          logo {
            original
          }
          user {
            pk
            id
          }
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(
      input: {
        id: $id
      }
    ) {
      success
      errors
    }
  }
`;