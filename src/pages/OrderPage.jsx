import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';

import AddressForm from '../components/AddressForm';
import OrderSummary from '../components/OrderSummary';
import DiscountCodeChecker from '../components/DiscountCodeChecker';
import CheckoutForm from '../components/CheckoutForm';
import orderProvider from '../providers/order.provider';
import addressProvider from '../providers/address.provider';

const stripePromise = loadStripe('pk_test_51HIDjLIUBv7LZRyQbGW05sT6n4VFjzafHyTzRL0LrvzLJzY3P2XBxc8QTnXwfL5zlhtbwlJpgOBvszpD3C4MgQiV00K1ebaHok');

class OrderPage extends Component {
  state = {
    order: null,
    loading: false,
    errors: null,
    billingIsShippingAddress: false
  };

  constructor(props) {
    super(props);

    this.addDiscountCode = this.addDiscountCode.bind(this);
    this.addBillingAddress = this.addBillingAddress.bind(this);
    this.addShippingAddress = this.addShippingAddress.bind(this);
    this.onShippingAddressToggleChange = this.onShippingAddressToggleChange.bind(this);
    this.onCheckoutDone = this.onCheckoutDone.bind(this);
  }

  componentDidMount() { 
    let orderId = this.props.match.params.id;

    this.setState({ loading: true });

    orderProvider.getOrder(orderId)
      .then(order => {
        this.setState({ loading: false });

        if (order) {
          this.setState({
            order,
            billingIsShippingAddress: !order.shippingAddress
          });
        }
      });
  }

  addDiscountCode(discountCode) {
    orderProvider.updateOrder(this.state.order.pk, { discountCodeId: discountCode.pk })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  addBillingAddress(address) {
    orderProvider.updateOrder(this.state.order.pk, { billingAddressId: address.pk })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  addShippingAddress(address) {
    orderProvider.updateOrder(this.state.order.pk, { shippingAddressId: address.pk })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  onShippingAddressToggleChange(e) {
    this.setState({ billingIsShippingAddress: e.target.checked });

    if (!e.checked) {
      if (this.state.order.shippingAddress) {
        addressProvider.deleteAddress(this.state.order.shippingAddress.pk);
      }
    }
  }

  onCheckoutDone(order) {
    this.setState({ order });
  }

  render() {
    if (!this.state.order) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This order doesn\'t exist'}
        </h4>
      );
    }

    return (
      <Row>
        {
          this.state.errors &&
          <Col md={9}>
            {this.state.errors['nonFieldErrors'].map(error => (
              <Alert variant="danger" key={error.code}>{error.message}</Alert>
            ))}
          </Col>
        }
        <Col md={9}>
          <Card>
            <Card.Header className="text-center">
              <strong>Order Details</strong>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5 className="mb-4">Billing Address</h5>
                <AddressForm 
                  address={this.state.order.billingAddress} 
                  onAddressResolved={this.addBillingAddress}
                  readOnly={this.state.order.done}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="mb-2">Shipping Address</h5>
                <Form.Check 
                  className="my-4" 
                  type="checkbox" 
                  checked={this.state.billingIsShippingAddress}
                  onChange={this.onShippingAddressToggleChange} 
                  label="Shipping address is the same as my billing address" 
                  disabled={this.state.order.done}
                />
                {
                  !this.state.billingIsShippingAddress &&
                  <AddressForm 
                    address={this.state.order.shippingAddress} 
                    onAddressResolved={this.addShippingAddress}
                    disabled={this.state.billingIsShippingAddress}
                    readOnly={this.state.order.done}
                  />
                }
              </ListGroup.Item>
              {
                !this.state.order.done &&
                <ListGroup.Item>
                  <h5 className="mb-4">Payment</h5>
                  <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                      {
                        ({ elements, stripe }) => (
                          <CheckoutForm 
                            elements={elements} 
                            stripe={stripe} 
                            order={this.state.order} 
                            onCheckoutDone={this.onCheckoutDone}
                          />
                        )
                      }
                    </ElementsConsumer>
                  </Elements>
                </ListGroup.Item>
              }
            </ListGroup>
            {
              this.state.order.done &&
              <Card.Footer>
                <small className="text-success">
                  <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>&nbsp;
                  Order completed on&nbsp;
                  {new Date(this.state.order.updated).toDateString()} at&nbsp;
                  {new Date(this.state.order.updated).toLocaleTimeString()}
                </small>
              </Card.Footer>
            }
          </Card>
        </Col>
        <Col>     
          <OrderSummary order={this.state.order} />
          {
            !this.state.order.done &&
            <div className="mt-2">
              <DiscountCodeChecker order={this.state.order} onDiscountCodeChecked={this.addDiscountCode} />
            </div>
          }
        </Col>
      </Row>
    );
  }
}

export default OrderPage;