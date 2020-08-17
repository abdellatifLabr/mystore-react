import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Container className="my-4">
          <Switch>
            <Route path="/" component={HomePage} exact />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;