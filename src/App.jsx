import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import UserVerificationAlert from './components/UserVerificationAlert';
import ActivationPage from './pages/ActivationPage';
import StorePage from './pages/StorePage';
import CreateStorePage from './pages/CreateStorePage';
import EditStorePage from './pages/EditStorePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import DashboardPage from './pages/DashboardPage';
import EditProductPage from './pages/EditProductPage';
import ProductPage from './pages/ProductPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Container className="my-4">
          {this.props.user && !this.props.user.verified && <UserVerificationAlert />}
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/signup" component={SignUpPage} exact />
            <Route path="/signin" component={SignInPage} exact />
            <Route path="/activate/:token" component={ActivationPage} exact />
            <Route path="/store/create" component={CreateStorePage} exact />
            <Route path="/store/:id" component={StorePage} exact />
            <Route path="/store/:id/edit" component={EditStorePage} exact />
            <Route path="/product/:id" component={ProductPage} exact />
            <Route path="/product/:id/edit" component={EditProductPage} exact />
            <Route path="/cart/:id" component={CartPage} exact />
            <Route path="/order/:id" component={OrderPage} exact />
            <Route path="/dashboard" component={DashboardPage} exact />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(App);