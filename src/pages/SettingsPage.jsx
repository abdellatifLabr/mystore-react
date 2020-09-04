import React, { Component, Suspense } from 'react';
import { Row, Col, ListGroup, Tab, Card } from 'react-bootstrap';

const ProfileForm = React.lazy(() => import('../components/ProfileForm'));

class SettingsPage extends Component {
  render() {
    return (
      <Tab.Container id="settings-tabs" defaultActiveKey="profile">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item action eventKey="profile">
                Profile
              </ListGroup.Item>
              <ListGroup.Item action eventKey="account">
                Account
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            <Card>
              <Card.Body>
                <Suspense fallback="Loading...">
                  <Tab.Content>
                    <Tab.Pane eventKey="profile">
                      <h4>Profile Settings</h4>
                      <ProfileForm />
                    </Tab.Pane>
                    <Tab.Pane eventKey="account">account</Tab.Pane>
                  </Tab.Content>
                </Suspense>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default SettingsPage;