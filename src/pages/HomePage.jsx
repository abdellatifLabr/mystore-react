import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import StoreCard from '../components/StoreCard';
import storeProvider from '../providers/store.provider';
import SearchResults from '../components/SearchResults';

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
    if (this.props.search) {
      return (
        <div>
          <h3 className="mb-3">Search Results</h3>
          <SearchResults search={this.props.search} />
        </div>
      )
    }

    return (
      <div>
        <h3 className="mb-3">Most Visited Stores</h3>
        <Row>
          {this.state.stores.map(store => (
            <Col md={3} className="mb-4" key={store.id}>
              <StoreCard store={store} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, {})(HomePage);