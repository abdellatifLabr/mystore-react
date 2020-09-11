import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, ListGroup, Form, Alert, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';

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
    this.setState({ loading: true });

    orderProvider.getOrder(this.props.orderId)
      .then(order => {
        this.setState({ loading: false });

        if (order) {
          this.setState({ order, billingIsShippingAddress: !order.shippingAddress });
        }
      });

    addressProvider.getMyAddresses()
      .then(addresses => {
        if (addresses) {
          this.setState({ addresses });
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

  addBillingAddress(e) {
    let addressId = e.target.value;

    orderProvider.updateOrder(this.state.order.pk, { billingAddressId: addressId })
      .then(data => {
        let { order, success } = data;

        if (success) {
          this.setState({ order });
        }
      });
  }

  addShippingAddress(e) {
    let addressId = e.target.value;

    orderProvider.updateOrder(this.state.order.pk, { shippingAddressId: addressId })
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
    let { order } = this.state;

    if (!order) {
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
                {'Order issued by '}
                <Link to={`/user/${order.user.id}`}>
                  {order.user.firstName} {order.user.lastName}
                </Link>
                {' to '} 
                <Link to={`/store/${order.store.id}`}>
                  {order.store.name}
                </Link>.
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="mb-4">Billing Address</h5>
                {
                  this.state.addresses && this.state.addresses.edges.map(edge => edge.node).length > 0
                  ? (
                    <Form.Control as="select" custom onChange={this.addBillingAddress} disabled={order.done}>
                      <option value="none" selected disabled hidden>Select an address</option>
                      {this.state.addresses.edges.map(edge => edge.node).map((address, index) => (
                        <option 
                          key={index} 
                          value={address.pk} 
                          selected={order.billingAddress && (address.pk === order.billingAddress.pk)}
                        >{address.formatted}</option>
                      ))}
                    </Form.Control>
                  ) : (
                    <Link to="/settings?tab=addresses">Create new address</Link>
                  )
                }
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="mb-4">Shipping Address</h5>
                <Form.Check 
                  className="mb-2" 
                  type="checkbox" 
                  checked={this.state.billingIsShippingAddress}
                  onChange={this.onShippingAddressToggleChange} 
                  label="My shipping address is the same as my billing address" 
                  disabled={order.done}
                />
                {
                  this.state.addresses && !this.state.billingIsShippingAddress &&
                  <Form.Control as="select" custom disabled={order.done} onChange={this.addShippingAddress}>
                    <option value="none" selected disabled hidden>Select an address</option>
                    {this.state.addresses.edges.map(edge => edge.node).map((address, index) => (
                      <option 
                        key={index} 
                        value={address.pk}
                        selected={order.billingAddress && (address.pk === order.billingAddress.pk)}
                      >{address.formatted}</option>
                    ))}
                  </Form.Control>
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