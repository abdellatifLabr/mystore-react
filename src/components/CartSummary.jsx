import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

class CartSummary extends Component {
  render() {
    return (
      <Card>
        <ListGroup variant="flush">
          {this.props.cart.cartProducts.edges.map(edge => edge.node).map(cartProduct => (
            <ListGroup.Item className="d-flex justify-content-between" key={cartProduct.id}>
              <div>{cartProduct.product.name}</div>
              <div>{cartProduct.cost}</div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex justify-content-between font-weight-bold">
            <div>Total</div>
            <div>{this.props.cart.total}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

export default CartSummary;