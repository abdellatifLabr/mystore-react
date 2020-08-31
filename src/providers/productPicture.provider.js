import apollo from '../graphql';
import * as mutations from '../graphql/mutations/productPicture.mutations';

class ProductPictureProvider {
  async create(productId, picture) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_PRODUCT_PICTURE,
      variables: { productId, picture }
    });

    return res.data.createProductPicture;
  }

  async update(productPictureId, picture) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_PRODUCT_PICTURE,
      variables: { productPictureId, picture }
    });

    return res.data.updateProductPicture;
  }

  async delete(productPictureId) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_PRODUCT_PICTURE,
      variables: { productPictureId }
    });

    return res.data.deleteProductPicture;
  }
}

export default new ProductPictureProvider();