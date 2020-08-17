import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Container className="my-4">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/signup" component={SignUpPage} exact />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;