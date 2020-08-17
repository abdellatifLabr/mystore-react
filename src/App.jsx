import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Container className="my-4">
          <Switch>
            
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;