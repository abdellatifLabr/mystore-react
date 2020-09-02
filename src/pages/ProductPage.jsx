import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

import productProvider from '../providers/product.provider';
import ProductPicturesExplorer from '../components/ProductPicturesExplorer';
import CartButton from '../components/CartButton';

class ProductPage extends Component {
  state = {
    loading: false,
    product: null
  };

  componentDidMount() {
    let productId = this.props.match.params.id;

    this.setState({ loading: true });

    productProvider.getProduct(productId)
      .then(product => {
        this.setState({ product });
      });
  }

  render() {
    if (!this.state.product) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This product doesn\'t exist'}
        </h4>
      );
    }

    let { name, description, price, store } = this.state.product;

    return (
      <Row>
        <Col>
          <ProductPicturesExplorer product={this.state.product} />
        </Col>
        <Col>
          <div className="mb-3">
            <h4 className="mb-0">{name}</h4>
            <small className="d-block mb-2 text-secondary">
              by <Link to={`/store/${store.id}`}>{store.name}</Link>
            </small>
            <p>{description}</p>
            <strong>{price}</strong>
          </div>
          <div>
            <CartButton product={this.state.product} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ProductPage;