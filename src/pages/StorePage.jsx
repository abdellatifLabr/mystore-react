import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Media, ListGroup, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';
import SubscribeButton from '../components/SubscribeButton';
import StoreUserOptions from '../components/StoreUserOptions';

const ProductsList = React.lazy(() => import('../components/ProductsList'));
const OrdersList = React.lazy(() => import('../components/OrdersList'));
const UsersList = React.lazy(() => import('../components/UsersList'));
const DiscountCodesControl = React.lazy(() => import('../components/DiscountCodesControl'));

class StorePage extends Component {
  state = {
    loading: false,
    store: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let storeId = this.props.match.params.id;

    this.setState({ loading: true });

    storeProvider.getStore(storeId)
      .then(store => {
        this.setState({ store, loading: false });

        setTimeout(() => {
          storeProvider.createVisit(store.pk);
        }, 5000);
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
    let visitorIsOwner = this.props.user && this.props.user.id === store.user.id;

    if (store.closed) {
      return <h4 className="text-secondary text-center">This store is closed</h4>
    }

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
                              <h5 className="m-0">{store.name}</h5>
                              <small className="text-secondary">{store.subscribersCount} subscribers</small>
                            </div>
                            {
                              visitorIsOwner
                              ? (
                                <div>
                                  <StoreUserOptions store={this.state.store} />
                                </div>
                              ) : (
                                <div>
                                  <SubscribeButton store={store} />
                                </div>
                              )
                            }
                          </div>
                        </Media.Body>
                      </Media>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col> 
          <Col className="mt-4" md={12}>
            <Tab.Container id="store-tabs" defaultActiveKey="products">
              <Row>
                <Col md={3}>
                  <ListGroup>
                    <ListGroup.Item action eventKey="products">
                      Products
                    </ListGroup.Item>
                    {
                      visitorIsOwner &&
                      <>
                        <ListGroup.Item action eventKey="orders">
                          Orders
                        </ListGroup.Item>
                        <ListGroup.Item action eventKey="subscribers">
                          Subscribers
                        </ListGroup.Item>
                        <ListGroup.Item action eventKey="discount-codes">
                          Discount Codes
                        </ListGroup.Item>
                      </>
                    }
                    <ListGroup.Item action eventKey="about">
                      About
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={9}>
                  <Suspense fallback="Loading...">
                    <Tab.Content>
                      <Tab.Pane eventKey="products">
                        <ProductsList store={store} />
                      </Tab.Pane>
                      {
                        visitorIsOwner &&
                        <>
                        <Tab.Pane eventKey="orders">
                          <OrdersList store={store} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="subscribers">
                          <Card>
                            <Card.Body>
                              <UsersList users={store.subscriptions.edges.map(edge => edge.node.user)} />
                            </Card.Body>
                          </Card>
                        </Tab.Pane>
                        <Tab.Pane eventKey="discount-codes">
                          <DiscountCodesControl discountCodes={store.discountCodes.edges.map(edge => edge.node)} storeId={store.pk} />
                        </Tab.Pane>
                        </>
                      }
                      <Tab.Pane eventKey="about">
                        <Card>
                          <Card.Body>
                            {store.description}
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Suspense>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(StorePage);