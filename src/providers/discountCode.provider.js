import apollo from '../graphql';
import * as queries from '../graphql/queries/discountCode.queries';

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
}

export default new DiscountCodeProvider();