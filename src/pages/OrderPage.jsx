import React, { Component } from 'react';
import { Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

import AddressForm from '../components/AddressForm';
import OrderSummary from '../components/OrderSummary';
import DiscountCodeChecker from '../components/DiscountCodeChecker';
import orderProvider from '../providers/order.provider';

class OrderPage extends Component {
  state = {
    order: null
  };

  constructor(props) {
    super(props);

    this.addDiscountCode = this.addDiscountCode.bind(this);
  }

  componentDidMount() { 
    let orderId = this.props.match.params.id;
    orderProvider.getOrder(orderId)
      .then(order => {
        if (order) {
          this.setState({ order });
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

  render() {
    return (
      <Row>
        <Col md={9}>
          <Card>
            <Card.Body>
              <h5 className="mb-2">Billing Address</h5>
              <AddressForm />

              <h5 className="mb-2 mt-4">Shipping Address</h5>
              <AddressForm />
    
              <h5 className="mb-2 mt-4">Payment</h5>
            </Card.Body>
            <Card.Footer className="text-right">
              <Button variant="primary">Checkout</Button>
              <Button variant="outline-danger" className="ml-2">Cancel & Delete</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          {
            this.state.order &&
            <OrderSummary order={this.state.order} />
          }
          <div className="mt-2">
            <DiscountCodeChecker onDiscountCodeChecked={this.addDiscountCode} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default OrderPage;