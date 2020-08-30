import React, { Component } from 'react';
import { Card, Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartButton from '../components/CartButton';
import ProductUserOptions from '../components/ProductUserOptions';

class ProductCard extends Component {
  render() {
    let product = this.props.product;

    return (
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center p-2">
          <div>
            <Media className="d-flex align-items-center">
              <Image
                width={32}
                height={32}
                className="mr-2"
                src={product.store.logo.original}
                alt={product.store.name}
                roundedCircle
                fluid
              />
              <Media.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Link to={`/store/${product.store.id}`}>{product.store.name}</Link> 
                  </div>
                </div>
              </Media.Body>
            </Media>
          </div>
          {
            this.props.user && this.props.user.id === product.store.user.id
            ? (
              <div>
                <ProductUserOptions product={product} />
              </div>
            ) : (
              <div></div>
            )
          }
        </Card.Header>
        <Card.Img variant="top" src={product.pictures[0].original} />
        <Card.Body className="d-flex justify-content-between align-items-center p-2">
          <div>
            <strong>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </strong>
          </div>
          <div>
            <strong>{product.price}</strong>
          </div>
        </Card.Body>
        <Card.Footer className="p-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CartButton size="sm" product={product} />
            </div>
          </div>
        </Card.Footer>
      </Card>
    );  
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(ProductCard);