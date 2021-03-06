import apollo from '../graphql';
import * as mutations from '../graphql/mutations/carts.mutations';
import * as queries from '../graphql/queries/carts.queries';

class CartsProvider {
  async createCartProduct(productId) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_CART_PRODUCT,
      variables: { productId }
    });

    return res.data.createCartProduct;
  }

  async deleteCartProduct(cartProductId) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_CART_PRODUCT,
      variables: { cartProductId }
    });

    return res.data.deleteCartProduct;
  }

  async updateCartProduct(cartProductId, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_CART_PRODUCT,
      variables: { cartProductId, ...fields }
    });

    return res.data.updateCartProduct;
  }

  async getCarts() {
    let res = await apollo.query({
      query: queries.CARTS
    });

    return res.data.carts;
  }

  async getCart(id) {
    let res = await apollo.query({
      query: queries.CART,
      variables: { id }
    });

    return res.data.cart;
  }

  async deleteCart(cartId) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_CART,
      variables: { cartId }
    });

    return res.data.deleteCart;
  }
}

export default new CartsProvider();