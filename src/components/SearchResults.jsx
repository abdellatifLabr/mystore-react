import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import productProvider from '../providers/product.provider';
import ProductCard from '../components/ProductCard';

class SearchResults extends Component {
  state = {
    products: null,
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({ loading: true });

      productProvider.searchProducts(this.props.search)
        .then(products => {
          this.setState({
            loading: false,
            products: products.edges.map(edge => edge.node)
          });
        });
    }
  }

  render() {
    if (!this.state.products || this.state.products.length === 0) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'No products found'}
        </h4>
      );
    }

    return (
      <Row>
        {this.state.products.map((product, index) => (
          <Col key={index} md={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  }
}

export default SearchResults;