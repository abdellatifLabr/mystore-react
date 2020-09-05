import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import OrderDetails from '../components/OrderDetails';
import orderProvider from '../providers/order.provider';

class OrderPage extends Component {
  state = {
    order: null,
    loading: false
  };

  componentDidMount() { 
    let orderId = this.props.match.params.id;

    this.setState({ loading: true });

    orderProvider.getOrder(orderId)
      .then(order => {
        this.setState({ loading: false });

        if (order) {
          this.setState({ order });
        }
      });
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
        <Col md={12}>
          <OrderDetails order={this.state.order} />
        </Col>
      </Row>
    );
  }
}

export default OrderPage;