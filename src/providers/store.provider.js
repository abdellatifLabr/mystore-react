import apollo from '../graphql';
import * as queries from '../graphql/queries/store.queries';
import * as mutations from '../graphql/mutations/store.mutations';

class StoreProvider {
  async getStores() {
    let res = await apollo.query({
      query: queries.STORES
    });
    return res.data.stores.edges.map(edge => edge.node);
  }

  async getStore(id) {
    let res = await apollo.query({
      query: queries.STORE,
      variables: { id }
    });
    return res.data.store;
  }

  async getSubscription(storeId) {
    let res = await apollo.query({
      query: queries.SUBSCRIPTION,
      variables: { storeId }
    });
    let subs = res.data.subscriptions.edges;
    if (subs.length > 0) return subs[0].node;
    return;
  }

  async subscribe(storeId) {
    let res = await apollo.mutate({
      mutation: mutations.SUBSCRIBE,
      variables: { storeId }
    });
    return res.data.createSubscription;
  }

  async unsubscribe(id) {
    let res = await apollo.mutate({
      mutation: mutations.UNSUBSCRIBE,
      variables: { id }
    });
    return res.data.deleteSubscription;
  }
}

export default new StoreProvider();