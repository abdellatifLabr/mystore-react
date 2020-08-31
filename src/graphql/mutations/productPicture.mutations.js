import { gql } from '@apollo/client';

export const CREATE_PRODUCT_PICTURE = gql`
  mutation CreateProductPicture(
    $productId: ID!,
    $picture: Upload!
  ) {
    createProductPicture(
      input: {
        productId: $productId,
        picture: $picture
      }
    ) {
      success
      productPicture {
        pk
        id
        original
        width
        height
      }
    }
  }
`;

export const UPDATE_PRODUCT_PICTURE = gql`
  mutation UpdateProductPicture(
    $productPictureId: ID!,
    $picture: Upload!
  ) {
    updateProductPicture(
      input: {
        productPictureId: $productPictureId,
        picture: $picture
      }
    ) {
      success
      productPicture {
        pk
        id
        original
        width
        height
      }
    }
  }
`;

export const DELETE_PRODUCT_PICTURE = gql`
  mutation DeleteProductPicture($productPictureId: ID!) {
    deleteProductPicture(
      input: {
        productPictureId: $productPictureId
      }
    ) {
      success
    }
  }
`;