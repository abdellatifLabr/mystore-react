import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import OrderDetails from '../components/OrderDetails';

class OrderPage extends Component {
  state = {
    orderId: null,
    loading: false
  };

  componentDidMount() { 
    let orderId = this.props.match.params.id;

    this.setState({ orderId });
  }

  render() {
    if (!this.state.orderId) return null;
    
    return (
      <Row>
        <Col md={12}>
          <OrderDetails orderId={this.state.orderId} />
        </Col>
      </Row>
    );
  }
}

export default OrderPage;