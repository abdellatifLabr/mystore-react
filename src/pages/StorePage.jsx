import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Media, ListGroup, Button, Tab, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';
import SubscribeButton from '../components/SubscribeButton';
import ProductCard from '../components/ProductCard';
import StoreUserOptions from '../components/StoreUserOptions';
import CreateProductForm from '../components/CreateProductForm';

class StorePage extends Component {
  state = {
    loading: false,
    store: null,
    showCreateProductModal: false
  };

  constructor(props) {
    super(props);

    this.handleCreateProductModalClose = this.handleCreateProductModalClose.bind(this);
    this.handleCreateProductModalOpen = this.handleCreateProductModalOpen.bind(this);
  }

  handleCreateProductModalOpen() {
    this.setState({
      showCreateProductModal: true
    });
  }

  handleCreateProductModalClose() {
    this.setState({
      showCreateProductModal: false
    });
  }

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
    let visitorIsOwner = this.props.user && this.props.user.id === store.user.id;

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
                <ListGroup.Item>
                  <Row>
                    <Col className="text-center">
                      <h3 className="font-weight-bold">10k</h3>
                      <div className="text-uppercase">Visits per day</div>
                    </Col>
                    <Col className="text-center">
                      <h3 className="font-weight-bold">22.5k</h3>
                      <div className="text-uppercase">Subscribers</div>
                    </Col>
                    <Col className="text-center">
                      <h3 className="font-weight-bold">10</h3>
                      <div className="text-uppercase">Workers</div>
                    </Col>
                  </Row>
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
                        <ListGroup.Item action eventKey="workers">
                          Workers
                        </ListGroup.Item>
                        <ListGroup.Item action eventKey="subscribers">
                          Subscribers
                        </ListGroup.Item>
                      </>
                    }
                    <ListGroup.Item action eventKey="about">
                      About
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="products">
                      <Row>
                        <Col md={12} className="mb-4">
                          {
                            visitorIsOwner &&
                            <Button variant="success" onClick={this.handleCreateProductModalOpen}>
                              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Product
                            </Button>
                          }
                        </Col>               
                        {products.map(product => (
                          <Col md={4} className="mb-4" key={product.id}>
                            <ProductCard product={product} />
                          </Col>
                        ))}         
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="workers">workers</Tab.Pane>
                    <Tab.Pane eventKey="subscribers">subscribers</Tab.Pane>
                    <Tab.Pane eventKey="about">about</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
        <Modal size="xl" show={this.state.showCreateProductModal} onHide={this.handleCreateProductModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateProductForm store={store} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(StorePage);