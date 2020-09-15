import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faStar } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';

import productProvider from '../providers/product.provider';
import ProductPicturesExplorer from '../components/ProductPicturesExplorer';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';

class ProductPage extends Component {
  state = {
    loading: false,
    product: null,
    similarProducts: null
  };

  constructor(props) {
    super(props);

    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.handleRatingHover = this.handleRatingHover.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleRatingClick(value) {
    if (value) {
      productProvider.updateProduct(this.state.product.pk, { rating: this.state.product.rating });
    }
  }

  handleRatingHover(value) {
    if (value) {
      this.setState(state => ({
        product: {
          ...state.product,
          rating: value
        }
      }));
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(props) {
    this.fetchData();
  }

  fetchData() {
    let productId = this.props.match.params.id;

    this.setState({ loading: true });

    productProvider.getProduct(productId)
      .then(product => {
        this.setState({ product });
        
        productProvider.getProducts({ storeId: product.store.id, orderBy: '-created' }, { count: 8, after: product.id })
          .then(products => {
            this.setState({
              similarProducts: products.edges.map(edge => edge.node)
            });
          });
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

    let { name, description, rating, ratingsCount, price, store } = this.state.product;

    return (
      <>
      <Row className="mb-5">
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
            <p>
              <Rating 
                fullSymbol={<FontAwesomeIcon icon={faStar} className="text-warning"></FontAwesomeIcon>}
                emptySymbol={<FontAwesomeIcon icon={faStar} className="text-secondary"></FontAwesomeIcon>}
                initialRating={rating}
                fractions={10}
                onChange={this.handleRatingChange}
                onClick={this.handleRatingClick}
                onHover={this.handleRatingHover}
              /> {rating}
              <small className="d-block text-secondary">{ratingsCount} review(s)</small>
            </p>
            <strong>{price}</strong>
          </div>
          <div>
            <CartButton product={this.state.product} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {
            !this.state.similarProducts        
            ? (
              <h4 className="text-secondary text-center">
                {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'No similar products available'}
              </h4>
            )
            : (
              <Row>
                <Col md={12} className="mb-4">
                  <h3>Similar Products</h3>
                </Col>
                {this.state.similarProducts.map((product, index) => (
                  <Col md={3} key={index} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )
          }
        </Col>
      </Row>
      </>
    );
  }
}

export default ProductPage;