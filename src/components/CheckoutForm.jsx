import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CardElement } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';

import orderProvider from '../providers/order.provider';

class CheckoutForm extends Component {
  CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        lineHeight: '1.8'
      }
    },
    classes: {
      base: 'form-control',
      invalid: 'is-invalid',
      complete: 'is-valid'
    },
    hidePostalCode: true
  };

  state = {
    loading: false,
    error: null
  };

  constructor(props) {
    super(props);

    this.onCompleteCheckoutClick = this.onCompleteCheckoutClick.bind(this);
  }

  onCompleteCheckoutClick() {
    this.completeCheckout()
      .then(order => {
        if (order) {
          this.props.onCheckoutDone(order);
        }
      });
  }

  async completeCheckout() {
    let { stripe, elements, order } = this.props;

    if (!stripe || !elements) {
      return;
    }

    this.setState({ loading: true });

    let cardElement = elements.getElement(CardElement);

    let { success, clientSecret } = await orderProvider.completeCheckout(order.pk);

    if (success) {
      let billingDetails = {
        name: this.props.user.firstName + ' ' + this.props.user.lastName,
        email: this.props.user.email,
        address: {
          country: order.billingAddress.country,
          city: order.billingAddress.city,
          line1: order.billingAddress.street,
          postal_code: order.billingAddress.postalCode
        }
      };

      let paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        this.setState({
          loading: false,
          error: paymentMethodReq.error.message
        });
        return;
      }

      let { id, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        this.setState({
          loading: false,
          error: error.message
        });
        return;
      }

      this.setState({ loading: false });

      let data = orderProvider.updateOrder(order.pk, { done: true, stripePaymentId: id });

      if (data.success) {
        return data.order;
      }

    }
  } 

  render() {
    return (
      <div>
        <CardElement options={this.CARD_OPTIONS} />
        <div className="mt-3 text-right">
          <Button variant="primary" disabled={this.state.loading} onClick={this.onCompleteCheckoutClick}>
            { 
              this.state.loading 
              ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
              : 'Complete Checkout'
            }
          </Button>
          <Button variant="outline-danger" className="ml-2">Cancel & Delete</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(CheckoutForm);