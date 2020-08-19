import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { removeProductFromCart, clearCart } from '../store/actions/cart.actions';
import QuantityControl from '../components/QuantityControl';
import CartButton from '../components/CartButton';
import CartSummary from '../components/CartSummary';
import orderProvider from '../providers/order.provider';
import cartProvider from '../providers/cart.provider';

class CartPage extends Component {
  state = {
    loading: false
  };

  constructor(props) {
    super(props);

    this.onProceedToCheckoutClick = this.onProceedToCheckoutClick.bind(this);
  }

  onProceedToCheckoutClick() {
    this.setState({ loading: true });

    this.prepareOrder()
      .then(order => {
        this.setState({ loading: false });

        if (order) {
          this.props.history.push(`/order/${order.id}`);
        } else {
          // notify error
        }
      });
  }

  async prepareOrder() {
    let createOrder = await orderProvider.createOrder();

    if (createOrder.success) {
      await this.props.cart.forEach(async cartProduct => {
        let orderId = createOrder.order.pk;
        let quantity = cartProduct.quantity;
        let productId = cartProduct.product.pk;
        await orderProvider.createOrderItem(orderId, quantity, productId);
      });
      
      await cartProvider.deleteAllCartProducts();
      this.props.clearCart();

      return createOrder.order;
    }

    return;
  }

  render() {
    if (this.props.cart.length == 0) {
      return <h4 className="text-secondary text-center">Your cart is empty</h4>
    }
    
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
          <CartSummary />
          <Button variant="primary" className="mt-2" block onClick={this.onProceedToCheckoutClick}>
            {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'Proceed to Checkout'}
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { removeProductFromCart, clearCart })(CartPage);