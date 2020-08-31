import apollo from '../graphql';
import * as mutations from '../graphql/mutations/product.mutations';
import * as queries from '../graphql/queries/product.queries';

class ProductProvider {
  async getProduct(id) {
    let res = await apollo.query({
      query: queries.PRODUCT,
      variables: { id }
    });

    return res.data.product;
  }

  async updateProduct(id, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_PRODUCT,
      variables: { id, ...fields }
    });

    return res.data.updateProduct;
  }
}

export default new ProductProvider();