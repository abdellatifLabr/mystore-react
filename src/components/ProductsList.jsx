import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { InView } from 'react-intersection-observer';

import ProductCard from '../components/ProductCard';
import CreateProductForm from '../components/CreateProductForm';
import productProvider from '../providers/product.provider';

class ProductsList extends Component {
  state = {
    loading: false,
    showCreateProductModal: false,
    products: null,
    filters: {
      storeId: this.props.store.id,
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

    this.handleCreateProductModalClose = this.handleCreateProductModalClose.bind(this);
    this.handleCreateProductModalOpen = this.handleCreateProductModalOpen.bind(this);
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleDeletedProduct = this.handleDeletedProduct.bind(this);
    this.handeFilterChange = this.handeFilterChange.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.handleLoadMoreVisibilityChange = this.handleLoadMoreVisibilityChange.bind(this);
  }

  handeFilterChange(e) {
    let { name, value } = e.target;
    this.setState(
      state => ({
        filters: {
          ...state.filters,
          [name]: value
        }
      }),
      () => this.loadProducts()
    );
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

  handleNewProduct(newProduct) {
    this.setState(state => ({
      products: [
        ...state.products,
        newProduct
      ]
    }));
  }

  handleDeletedProduct(index) {
    this.setState(state => ({
      products: [
        ...state.products.slice(0, index),
        ...state.products.slice(index + 1)
      ]
    }));
  }

  componentDidMount() {
    this.loadProducts();
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
        () => this.loadProducts(false)
      );
    }
  }

  loadProducts(explicit = true) {
    this.setState(
      state => ({ 
        loading: (!state.products) ? true : false
      }),
      () => {
        productProvider.getProducts(this.state.filters, this.state.pagination)
          .then(products => {
            let loadedProducts = products.edges.map(edge => edge.node);
            this.setState(state => ({
              loading: false,
              products: (explicit) ? loadedProducts : [...state.products, ...loadedProducts],
              pageInfo: products.pageInfo
            }));
          });
      }
    );
  }

  render() {
    let visitorIsOwner = this.props.user && this.props.user.id === this.props.store.user.id;

    return (
      <>
        <Row className="mb-4">
          <Col md={12}>
            <Row>
              <Col>
                {
                  visitorIsOwner &&
                  <Button variant="success" onClick={this.handleCreateProductModalOpen}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Product
                  </Button>
                } 
              </Col>
              <Col>
                <Form.Control 
                  as="select" 
                  custom 
                  name="orderBy" 
                  value={this.state.filters.orderBy}
                  onChange={this.handeFilterChange}
                >
                  <option value="-created">Newest</option>
                  <option value="created">Oldest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control 
                  type="text"
                  placeholder="Search by name"
                  name="name"
                  value={this.state.filters.name}
                  onChange={this.handeFilterChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {
          !this.state.products || this.state.products.length === 0
          ? (
            <h4 className="text-secondary text-center">
              {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'No products available'}
            </h4>
          ) : (
            <Row className="mb-4">
              {this.state.products.map((product, index) => (
                <Col md={4} className="mb-4" key={index}>
                  <ProductCard product={product} onDelete={() => this.handleDeletedProduct(index)} />
                </Col>
              ))}
            </Row>
          )
        }
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
        <Modal size="xl" show={this.state.showCreateProductModal} onHide={this.handleCreateProductModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateProductForm store={this.props.store} onCreateProduct={this.handleNewProduct} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(ProductsList);