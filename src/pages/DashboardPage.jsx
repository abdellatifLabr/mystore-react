import React, { Component } from 'react';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';

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