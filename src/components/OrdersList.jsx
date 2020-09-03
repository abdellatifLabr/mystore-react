import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faHourglassHalf, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import orderProvider from '../providers/order.provider';
import { formatDateTime } from '../utils';

class OrdersList extends Component {
  state = {
    loading: false,
    orders: null
  };

  componentDidMount() {
    let storeId = this.props.store.id;

    orderProvider.getOrders(storeId)
      .then(orders => {
        console.log(orders)
        if (orders) {
          this.setState({ orders });
        }
      });
  }

  render() {
    if (!this.state.orders) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'No orders available'}
        </h4>
      );
    }

    return (
      <Row>
        <Col md={12}>
          <Table hover className="bg-white">
            <thead>
              <tr>
                <th>User</th>
                <th>Country</th>
                <th>City</th>
                <th>Created</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.edges.map(edge => edge.node).map((order, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/user/${order.user.id}`}>
                      {order.user.firstName} {order.user.lastName}
                    </Link>
                  </td>
                  <td>{order.billingAddress.countryName}</td>
                  <td>{order.billingAddress.city}</td>
                  <td>{formatDateTime(order.created)}</td>
                  <td>
                    {
                      order.done
                      ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success"></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon icon={faHourglassHalf} className="text-warning"></FontAwesomeIcon>
                      )
                    }
                  </td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default OrdersList;