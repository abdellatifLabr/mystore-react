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

  async getProducts(storeId) {
    let res = await apollo.query({
      query: queries.PRODUCTS,
      variables: { storeId }
    });

    return res.data.products;
  }

  async updateProduct(id, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_PRODUCT,
      variables: { id, ...fields }
    });

    return res.data.updateProduct;
  }

  async createProduct(storeId, fields) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_PRODUCT,
      variables: { storeId, ...fields }
    });

    return res.data.createProduct;
  }

  async deleteProduct(id) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_PRODUCT,
      variables: { id }
    });

    return res.data.deleteProduct;
  }
}

export default new ProductProvider();