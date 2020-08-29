import React, { Component } from 'react';
import { Tab, Nav, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';
import StoreCard from '../components/StoreCard';

class DashboardPage extends Component {
  state = {
    myStores: null
  };

  componentDidMount() {
    storeProvider.myStores()
      .then(myStores => {
        this.setState({ myStores });
      });
  }

  render() {
    return (
      <Tab.Container id="dashboard-tabs" defaultActiveKey="stores">
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
                    <Nav.Link eventKey="settings">Settings</Nav.Link>
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
                  <Tab.Pane eventKey="settings">
                    settings
                  </Tab.Pane>
                </Tab.Content>
              
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default DashboardPage;