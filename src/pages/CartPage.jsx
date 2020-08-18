import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';

import { removeProductFromCart } from '../store/actions/cart.actions';
import QuantityControl from '../components/QuantityControl';
import CartButton from '../components/CartButton';

class CartPage extends Component {

  render() {
    return (
      <Row>
        <Col md={9}>
          <Card>
            <ListGroup>
              {this.props.cart.map(cartProduct => (
                <ListGroup.Item key={cartProduct.id} className="d-flex">
                  <div className="w-25">
                    <Image src={cartProduct.product.pictures[0].original} fluid></Image>
                  </div>
                  <div className="ml-2 py-2 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h4>{cartProduct.product.name}</h4>
                      <p className="text-secondary">{cartProduct.product.description}</p>
                      <span className="font-weight-bold">
                        {cartProduct.product.price.value} &nbsp;
                        {cartProduct.product.price.currency}
                      </span>
                    </div>
                    <div>
                      <CartButton product={cartProduct.product} size="sm" />
                    </div>
                  </div>
                  <div>
                    <QuantityControl cartProduct={cartProduct} size="sm" />
                  </div>
                  <div className="text-success font-weight-bold">
                    {cartProduct.quantity * cartProduct.product.price.value} &nbsp;
                    {cartProduct.product.price.currency}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col>
          {/* <CartSummary /> */}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { removeProductFromCart })(CartPage);