import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faHourglassHalf, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import orderProvider from '../providers/order.provider';
import { formatDateTime } from '../utils';

class OrdersList extends Component {
  state = {
    loading: false,
    orders: null
  };

  showOrderDetails(order) {
    this.props.history.push(`/order/${order.id}`);
  }

  componentDidMount() {
    let storeId = this.props.store.id;

    this.setState({ loading: true });

    orderProvider.getOrders(storeId)
      .then(orders => {
        this.setState({ loading: false });

        if (orders) {
          this.setState({ orders });
        }
      });
  }

  render() {
    if (this.state.loading || !this.state.orders) {
      return (
        <h4 className="text-secondary text-center">
          <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
        </h4>
      );
    }

    let orders = this.state.orders.edges.map(edge => edge.node);

    if (orders.length === 0) {
      return <h4 className="text-secondary text-center">No orders available</h4>
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
              {orders.map((order, index) => (
                <tr key={index} onClick={e => this.showOrderDetails(order)}>
                  <td>
                    <Image 
                      src={order.user.profile.avatar.original} 
                      fluid 
                      roundedCircle 
                      width="25" 
                      height="25" 
                      className="mr-2"
                    />
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

export default withRouter(OrdersList);