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
