import apollo from '../graphql';
import * as queries from '../graphql/queries/store.queries';
import * as mutations from '../graphql/mutations/store.mutations';

class StoreProvider {
  async getStores(filters, pagination) {
    let res = await apollo.query({
      query: queries.STORES,
      variables: { ...filters, ...pagination }
    });
    return res.data.stores;
  }

  async myStores() {
    let res = await apollo.query({
      query: queries.MY_STORES
    });

    return res.data.myStores;
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

  async getMySubscriptions() {
    let res = await apollo.query({
      query: queries.MY_SUBSCRIPTIONS
    });

    return res.data.mySubscriptions;
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

  async updateStore(id, fields) {
    let res = await apollo.mutate({
      mutation: mutations.UPDATE_STORE,
      variables: { id, ...fields },
      context: {
        useMultipart: true
      }
    });

    return res.data.updateStore;
  }

  async createStore(store) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_STORE,
      variables: { ...store },
      context: {
        useMultipart: true
      }
    });

    return res.data.createStore;
  }

  async createVisit(storeId) {
    let res = await apollo.mutate({
      mutation: mutations.CREATE_VISIT,
      variables: { storeId }
    }); 

    return res.data.createVisit;
  }

  async getAnalytics(analyticsId) {
    let res = await apollo.query({
      query: queries.ANALYTICS,
      variables: { analyticsId }
    });

    return res.data.analytics;
  }
}

export default new StoreProvider();