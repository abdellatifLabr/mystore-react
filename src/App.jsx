import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import UserVerificationAlert from './components/UserVerificationAlert';
import ActivationPage from './pages/ActivationPage';

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
            <Route path="/activate/:token" component={ActivationPage} exact />
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