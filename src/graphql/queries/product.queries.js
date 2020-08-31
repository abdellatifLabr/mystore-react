import { gql } from '@apollo/client';

export const PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      pk
      id
      name
      description
      quantity
      unitsLeft
      price
      pictures {
        edges {
          node {
            pk
            id
            original
            width
            height
          }
        }
      }
    }
  }
`;
