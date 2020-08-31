import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import EditProductForm from '../components/EditProductForm';
import ProductPicturesEditor from '../components/ProductPicturesEditor';
import productProvider from '../providers/product.provider';

class EditProductPage extends Component {
  state = {
    product: null
  };

  componentDidMount() {
    let productId = this.props.match.params.id;

    this.setState({ loading: true });

    productProvider.getProduct(productId)
      .then(product => {
        this.setState({ product, loading: false });
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

    return (
      <Row>
        <Col md={6}>
          <EditProductForm product={this.state.product} />
        </Col>
        <Col md={6}>
          <ProductPicturesEditor product={this.state.product} />
        </Col>
      </Row>
    );
  }
}

export default EditProductPage;