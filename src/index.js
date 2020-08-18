import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import Splash from './Splash';
import store from './store';
import apolloClient from './graphql';
import userProvider from './providers/user.provider';
import { setUser } from './store/actions/user.actions';
import cartProvider from './providers/cart.provider';
import { addProductToCart } from './store/actions/cart.actions';

async function acquirePreRenderRequirements() {
  if (userProvider.isAuthenticated()) {
    let user = await userProvider.me();
    store.dispatch(setUser(user));

    let cartProducts = await cartProvider.getCartProducts(user.id);
    cartProducts.forEach(cartProduct => store.dispatch(addProductToCart(cartProduct)));
  }
  return;
}

ReactDOM.render(
  <React.StrictMode>
    <Splash />
  </React.StrictMode>,
  document.getElementById('root')
); 

acquirePreRenderRequirements()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );    
  });