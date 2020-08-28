import React, { Component } from 'react';
import { Card, Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CartButton from '../components/CartButton';

class ProductCard extends Component {
  render() {
    let product = this.props.product;

    return (
      <Card>
        <Card.Header>
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
        </Card.Header>
        <Card.Img variant="top" src={product.pictures[0].original} />
        <Card.Body>
          <strong>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </strong>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center">
            <strong>{product.price.value}</strong>
            <div>
              <CartButton size="sm" product={product} />
            </div>
          </div>
        </Card.Footer>
      </Card>
    );  
  }
}

export default ProductCard;