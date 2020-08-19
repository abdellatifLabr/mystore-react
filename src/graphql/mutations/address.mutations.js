import { gql } from '@apollo/client';

export const CREATE_ADDRESS = gql`
  mutation CreateAddress(
    $country: String!,
    $city: String!,
    $street: String!,
    $postalCode: String!
  ) {
    createAddress(
      input: {
        country: $country,
        city: $city,
        street: $street,
        postalCode: $postalCode
      }
    ) {
      success
      errors
      address {
        pk
        id
        country
        city
        street
        postalCode
      }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress(
    $id: ID!,
    $country: String,
    $city: String,
    $street: String,
    $postalCode: String
  ) {
    updateAddress(
      input: {
        id: $id,
        country: $country,
        city: $city,
        street: $street,
        postalCode: $postalCode
      }
    ) {
      success
      errors
      address {
        pk
        id
        country
        city
        street
        postalCode
      }
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    deleteAddress(input: { id: $id }) {
      success
    }
  }
`;
