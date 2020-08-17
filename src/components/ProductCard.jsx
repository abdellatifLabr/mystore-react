import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    let product = this.props.product;
    let price = product.price.value;
    let currency = product.price.currency;

    return (
      <Card>
        <Card.Img variant="top" src={product.pictures[0].original} />
        <Card.Body>
          <strong>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </strong>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <strong>{price} {currency}</strong>
            <div>
              {/* <AddToCartButton size="sm" product={product} /> */}
            </div>
          </div>
        </Card.Footer>
      </Card>
    );  
  }
}

export default ProductCard;