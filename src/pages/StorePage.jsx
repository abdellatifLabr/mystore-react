import React, { Component } from 'react';
import { Row, Col, Card, Media, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';
import SubscribeButton from '../components/SubscribeButton';
import ProductCard from '../components/ProductCard';

class StorePage extends Component {
  state = {
    loading: false,
    store: null
  };

  componentDidMount() {
    let storeId = this.props.match.params.id;

    this.setState({ loading: true });

    storeProvider.getStore(storeId)
      .then(store => {
        this.setState({ store, loading: false });
      });
  }

  render() {
    if (!this.state.store) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This store doesn\'t exist'}
        </h4>
      );
    }

    let store = this.state.store;
    let products = store.products.edges.map(edge => edge.node);

    return (
      <div>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Img variant="top" src={store.cover.original} />
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <Media className="d-flex align-items-center">
                        <img
                          width={64}
                          height={64}
                          className="mr-3 rounded-circle"
                          src={store.logo.original}
                          alt={store.name}
                        />
                        <Media.Body>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <h4 className="m-0">{store.name}</h4>
                            </div>
                            <div>
                              <SubscribeButton store={store} />
                            </div>
                          </div>
                        </Media.Body>
                      </Media>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="text-center">
                      <div className="text-uppercase">Visits per day</div>
                      <h3 className="font-weight-bold">10k</h3>
                    </Col>
                    <Col className="text-center">
                      <div className="text-uppercase">Subscribers</div>
                      <h3 className="font-weight-bold">22.5k</h3>
                    </Col>
                    <Col className="text-center">
                      <div className="text-uppercase">Workers</div>
                      <h3 className="font-weight-bold">10</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col> 
          <Col className="mt-4">
            <Row>               
              {products.map(product => (
                <Col md={3} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}         
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StorePage;