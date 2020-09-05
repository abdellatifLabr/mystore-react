import React, { Component } from 'react';
import { Row, Col, Card, ListGroup, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';

import AddressForm from '../components/AddressForm';
import OrderSummary from '../components/OrderSummary';
import DiscountCodeChecker from '../components/DiscountCodeChecker';
import CheckoutForm from '../components/CheckoutForm';
import orderProvider from '../providers/order.provider';
import addressProvider from '../providers/address.provider';
import { formatDateTime } from '../utils';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

class OrderDetails extends Component {
  state = {
    order: null,
    loading: false,
    errors: null,
    addresses: null,
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
    addressProvider.getMyAddresses()
      .then(addresses => {
        if (addresses) {
          this.setState({ addresses });
        }
      });
  }

  addDiscountCode(discountCode) {
    orderProvider.updateOrder(this.props.order.pk, { discountCodeId: discountCode.pk })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  addBillingAddress(address) {
    orderProvider.updateOrder(this.props.order.pk, { billingAddressId: address.pk })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  addShippingAddress(address) {
    orderProvider.updateOrder(this.props.order.pk, { shippingAddressId: address.pk })
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
      if (this.props.order.shippingAddress) {
        addressProvider.deleteAddress(this.props.order.shippingAddress.pk);
      }
    }
  }

  onCheckoutDone(order) {
    this.setState({ order });
  }

  render() {
    let { order } = this.props;

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
                  address={order.billingAddress}
                  addresses={this.state.addresses} 
                  onAddressResolved={this.addBillingAddress}
                  readOnly={order.done}
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
                  disabled={order.done}
                />
                {
                  !this.state.billingIsShippingAddress &&
                  <AddressForm 
                    address={order.shippingAddress} 
                    addresses={this.state.addresses} 
                    onAddressResolved={this.addShippingAddress}
                    disabled={this.state.billingIsShippingAddress}
                    readOnly={order.done}
                  />
                }
              </ListGroup.Item>
              {
                !order.done &&
                <ListGroup.Item>
                  <h5 className="mb-4">Payment</h5>
                  <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                      {
                        ({ elements, stripe }) => (
                          <CheckoutForm 
                            elements={elements} 
                            stripe={stripe} 
                            order={order} 
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
              order.done &&
              <Card.Footer>
                <small className="text-success">
                  <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>&nbsp;
                  Order completed on {formatDateTime(order.updated)}
                </small>
              </Card.Footer>
            }
          </Card>
        </Col>
        <Col>     
          <OrderSummary order={order} />
          {
            !order.done &&
            <div className="mt-2">
              <DiscountCodeChecker order={order} onDiscountCodeChecked={this.addDiscountCode} />
            </div>
          }
        </Col>
      </Row>
    );
  }
}

export default OrderDetails;