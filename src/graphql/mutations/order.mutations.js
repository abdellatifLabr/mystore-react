import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder(input: {}) {
      success
      order {
        pk
        id
      }
    }
  }
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem(
    $productId: ID!,
    $orderId: ID!,
    $quantity: Int!
  ) {
    createOrderItem(
      input: {
        productId: $productId,
        orderId: $orderId,
        quantity: $quantity
      }
    ) {
      success
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: ID!,
    $done: Boolean,
    $shippingAddressId: ID,
    $billingAddressId: ID,
    $discountCodeId: ID
  ) {
    updateOrder(
      input: {
        id: $id,
        done: $done,
        shippingAddressId: $shippingAddressId,
        billingAddressId: $billingAddressId,
        discountCodeId: $discountCodeId
      }
    ) {
      success
      order {
        pk
        id
        done
        total
        updated
        billingAddress {
          pk
          id
          country
          city
          street
          postalCode
        }
        shippingAddress {
          pk
          id
          country
          city
          street
          postalCode
        }
        discountCodes {
          edges {
            node {
              pk
              id
              code
              value
              store {
                pk
                id
                name
              }
            }
          }
        }
        items {
          edges {
            node {
              pk
              id
              quantity
              cost
              product {
                name
                price {
                  amount
                  display
                  valueCurrency
                }
                store {
                  pk
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const COMPLETE_CHECKOUT = gql`
  mutation CompleteCheckout($orderId: ID!) {
    completeCheckout(
      input: { 
        orderId: $orderId 
      }
    ) {
      success
      clientSecret
    }
  }
`;
