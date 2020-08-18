import apollo from '../graphql';
import * as mutations from '../graphql/mutations/cart.mutations';
import * as queries from '../graphql/queries/cart.queries';

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

  async getCartProducts(userId) {
    let res = await apollo.query({
      query: queries.CART_PRODUCTS,
      variables: { userId }
    });

    return res.data.cartProducts.edges.map(edge => edge.node);
  }
}

export default new CartProvider();