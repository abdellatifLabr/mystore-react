import React, { Component } from 'react';
import { connect } from 'react-redux';

import storeProvider from '../providers/store.provider';
import SearchResults from '../components/SearchResults';
import StoresList from '../components/StoresList';

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
        <h3 className="mb-4">Most Visited Stores</h3>
        <StoresList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, {})(HomePage);