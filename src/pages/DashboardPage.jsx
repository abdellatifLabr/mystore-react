import React, { Component } from 'react';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';

class DashboardPage extends Component {
  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Nav variant="tabs" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Analytics</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Stores</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    first
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    second
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default DashboardPage;