import { gql } from '@apollo/client';

export const SUBSCRIBE = gql`
  mutation Subscribe($storeId: ID!) {
    createSubscription(
      input: {
        storeId: $storeId
      }
    ) {
      success
      subscription {
        id
        pk
      }
    }
  }
`;

export const UNSUBSCRIBE = gql`
  mutation Subscribe($id: ID!) {
    deleteSubscription(
      input: {
        subscriptionId: $id
      }
    ) {
      success
    }
  }
`;

export const UPDATE_STORE = gql`
  mutation UpdateStore(
    $id: ID!,
    $name: String,
    $description: String,
    $closed: Boolean,
    $shipping: Decimal,
    $logo: Upload,
    $cover: Upload,
    $workers: [ID] 
  ) {
    updateStore(
      input: {
        id: $id,
        name: $name,
        description: $description,
        closed: $closed,
        shipping: $shipping,
        logo: $logo,
        cover: $cover,
        workers: $workers
      }
    ) {
      success
      errors
      store {
        pk
        id
      }
    }
  }
`;

export const CREATE_STORE = gql`
  mutation CreateStore(
    $name: String!,
    $description: String!,
    $logo: Upload,
    $cover: Upload,
    $closed: Boolean,
    $shipping: Decimal!
  ) {
    createStore(
      input: {
        name: $name,
        description: $description,
        logo: $logo,
        cover: $cover,
        closed: $closed,
        shipping: $shipping
      }
    ) {
      success
      errors
      store {
        pk
        id
      }
    }
  }
`;