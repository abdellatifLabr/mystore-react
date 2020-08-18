import apollo from '../graphql';
import * as mutations from '../graphql/mutations/cart.mutations';

class CartProvider {
  async createCartProduct(productId) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_CART_PRODUCT,
      variables: { productId }
    });

    return res.data.createCartProduct;
  }

  async deleteCartProduct(productId) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_CART_PRODUCT,
      variables: { productId }
    });

    return res.data.deleteCartProduct;
  }
}

export default new CartProvider();