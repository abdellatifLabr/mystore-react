import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, Button } from 'react-bootstrap';

class CartSummary extends Component {
  state = {
    discountCodes: []
  };

  render() {
    let total = this.props.cart.reduce((result, cartProduct) => {
      return result + cartProduct.cost;
    }, 0);

    return (
      <Card>
        <ListGroup variant="flush">
          {this.props.cart.map(cartProduct => (
            <ListGroup.Item className="d-flex justify-content-between" key={cartProduct.id}>
              <div>{cartProduct.product.name}</div>
              <div>{cartProduct.cost} {cartProduct.product.price.currency}</div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex justify-content-between font-weight-bold">
            <div>Total</div>
            <div>{total} {this.props.cart[0].product.price.currency}</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, {})(CartSummary);