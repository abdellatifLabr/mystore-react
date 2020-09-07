import apollo from '../graphql';
import * as queries from '../graphql/queries/discountCode.queries';
import * as mutations from '../graphql/mutations/discountCode.mutations';

class DiscountCodeProvider {
  async getDiscountCode(code, storeId) {
    let res = await apollo.query({
      query: queries.DISCOUNT_CODE,
      variables: { code, storeId }
    });

    if (res.data.discountCodes.edges.length > 0) {
      return res.data.discountCodes.edges[0].node;
    }

    return;
  }

  async createDiscountCode(storeId, discountCode) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_DISCOUNT_CODE,
      variables: { storeId, ...discountCode }
    });

    return res.data.createDiscountCode;
  }

  async deleteDiscountCode(id) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_DISCOUNT_CODE,
      variables: { id }
    });

    return res.data.deleteDiscountCode;
  }
}

export default new DiscountCodeProvider();