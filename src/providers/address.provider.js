import apollo from '../graphql';
import * as mutations from '../graphql/mutations/address.mutations';

class AddressProvider {
  async createAddress(address) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_ADDRESS,
      variables: { ...address }
    });

    return res.data.createAddress;
  }

  async updateAddress(id, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_ADDRESS,
      variables: { id, ...fields }
    });

    return res.data.updateAddress;
  } 

  async deleteAddress(id) {
    let res = await apollo.mutate({
      mutation: mutations.DELETE_ADDRESS,
      variables: { id }
    });

    return res.data.deleteAddress;
  }
}

export default new AddressProvider();