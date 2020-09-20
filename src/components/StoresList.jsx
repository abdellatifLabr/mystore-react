import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { InView } from 'react-intersection-observer';

import storeProvider from '../providers/store.provider';
import StoreCard from '../components/StoreCard';

class StoresList extends Component {
  state = {
    loading: false,
    stores: null,
    filters: {
      orderBy: '-created'
    },
    pageInfo: {},
    pageNumber: 1,
    pagination: {
      count: 3,
      after: ''
    }
  };

  constructor(props) {
    super(props);

    this.loadStores = this.loadStores.bind(this);
    this.handleLoadMoreVisibilityChange = this.handleLoadMoreVisibilityChange.bind(this);
  }

  loadStores(explicit = true) {
    this.setState(
      state => ({
        loading: (!state.stores) ? true : false
      }),
      () => {
        storeProvider.getStores(this.state.filters, this.state.pagination)
          .then(stores => {
            let loadedStores = stores.edges.map(edge => edge.node);
            this.setState(
              state => ({
                loading: false,
                stores: (explicit) ? loadedStores : [...state.stores, ...loadedStores],
                pageInfo: stores.pageInfo
              })
            );
          });
      }
    );
  }

  handleLoadMoreVisibilityChange(inView) {
    if (inView) {
      this.setState(
        state => ({
          pagination: {
            ...state.pagination,
            after: state.pageInfo.endCursor
          }
        }),
        () => this.loadStores(false)
      );
    }
  }

  componentDidMount() {
    this.loadStores();
  }

  render() {
    if (!this.state.stores || this.state.stores.length === 0) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'No Stores available'}
        </h4>
      )
    }

    return (
      <>
      <Row>
        {this.state.stores.map((store, index) => (
          <Col key={index} md={3}>
            <StoreCard store={store} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12}>
          {
            this.state.pageInfo.hasNextPage &&
            <InView as="div" onChange={this.handleLoadMoreVisibilityChange}>
              <h4 className="text-secondary text-center">
                <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
              </h4>
            </InView>
          }
        </Col>
      </Row>
      </>
    );
  }
}

export default StoresList;