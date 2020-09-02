import apollo from '../graphql';
import * as mutations from '../graphql/mutations/order.mutations';
import * as queries from '../graphql/queries/order.queries';

class OrderProvider {
  async getDiscountCode(code) {
    let res = await apollo.query({
      query: queries.DISCOUNT_CODE,
      variables: { code }
    });
    return res.data.discountCodes.edges[0].node;
  }

  async createOrder(cartId) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_ORDER,
      variables: { cartId }
    });
    return res.data.createOrder;
  }

  async createOrderItem(orderId, quantity, productId) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_ORDER_ITEM,
      variables: { orderId, quantity, productId }
    });
    return res.data.createOrderItem;
  }

  async getOrder(id) {
    let res = await apollo.query({
      query: queries.ORDER,
      variables: { id }
    });
    return res.data.order;
  }

  async updateOrder(id, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_ORDER,
      variables: { id, ...fields }
    });
    return res.data.updateOrder;
  }

  async completeCheckout(orderId) {
    let res = await apollo.mutate({
      mutation: mutations.COMPLETE_CHECKOUT,
      variables: { orderId }
    });

    return res.data.completeCheckout;
  }

  async deleteOrder(id) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_ORDER,
      variables: { id }
    });

    return res.data.deleteOrder;
  }
}

export default new OrderProvider();