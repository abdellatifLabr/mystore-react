import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import StoreCard from '../components/StoreCard';
import storeProvider from '../providers/store.provider';

class HomePage extends Component {
  state = {
    stores: []
  };

  componentDidMount() {
    storeProvider.getStores()
      .then(stores => {
        this.setState({ stores });
      });
  }

  render() {
    return (
      <div>
        <h3 className="mb-3">Most Visited Stores</h3>
        <Row>
          {this.state.stores.map(store => (
            <Col md={3} key={store.id}>
              <StoreCard store={store} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default HomePage;