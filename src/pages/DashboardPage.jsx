import React, { Component } from 'react';
import { Tab, Nav, Row, Col, Button, Table, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';
import orderProvider from '../providers/order.provider';
import StoreCard from '../components/StoreCard';
import { formatDateTime } from '../utils';

class DashboardPage extends Component {
  state = {
    defaultActiveTab: null,
    myStores: null,
    myOrders: null,
    mySubscriptions: null
  };

  componentDidMount() {
    if (this.props.location.search !== '') {
      let params = new URLSearchParams(this.props.location.search);
      this.setState({
        defaultActiveTab: params.get('tab')
      });
    } else {
      this.setState({
        defaultActiveTab: 'analytics'
      });
    }

    storeProvider.myStores()
      .then(myStores => {
        this.setState({ myStores });
      });
    
    storeProvider.getMySubscriptions()
      .then(mySubscriptions => {
        if (mySubscriptions) {
          this.setState({ mySubscriptions });
        }
      });

    orderProvider.getMyOrders()
      .then(myOrders => {
        this.setState({ myOrders });
      })
  }

  render() {
    return (
      this.state.defaultActiveTab &&
      <Tab.Container id="dashboard-tabs" defaultActiveKey={this.state.defaultActiveTab}>
        <Row>
          <Col md={12}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="analytics">Analytics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="stores">Stores</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="subscriptions">Subscriptions</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="py-3">
              <Tab.Pane eventKey="analytics">
                analytics
              </Tab.Pane>
              <Tab.Pane eventKey="stores">
                {
                  this.state.myStores &&
                  <Row>
                    {this.state.myStores.edges.map(edge => edge.node).map(store => (
                      <Col md={3} key={store.id}>
                        <StoreCard store={store} />
                      </Col>
                    ))}
                    <Col md={3}>
                      <Link to="/store/create">
                        <Button block className="h-100 bg-white border border-1">
                          <h2 className="icon text-secondary">
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                          </h2>
                          <div className="text text-secondary font-weight-bold">New Store</div>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                }
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                {
                  this.state.myOrders &&
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
                          {this.state.myOrders.edges.map(edge => edge.node).map((order, index) => (
                          <tr key={index} onClick={e => this.props.history.push(`/order/${order.id}`)}>
                            <td>
                              <Image src={order.user.profile.avatar.original} fluid roundedCircle width="25" height="25"
                                className="mr-2" />
                              <Link to={`/user/${order.user.id}`}> {order.user.firstName} {order.user.lastName} </Link>
                                </td> { order.billingAddress ? ( <>
                            <td>{order.billingAddress.countryName}</td>
                            <td>{order.billingAddress.city}</td>
                            </>
                            ) : (
                            <>
                              <td>/</td>
                              <td>/</td>
                            </>
                            )
                            }
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
                }
              </Tab.Pane>
              <Tab.Pane eventKey="subscriptions">
                {
                  this.state.mySubscriptions &&
                  <Row>
                    {this.state.mySubscriptions.edges.map(edge => edge.node).map((subscription, index) => (
                      <Col key={index} md={3}>
                        <StoreCard store={subscription.store} />
                      </Col>
                    ))}
                  </Row>
                }
              </Tab.Pane>
            </Tab.Content>  
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default DashboardPage;