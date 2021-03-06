import React, { Component, Suspense } from 'react';
import { Row, Col, ListGroup, Tab, Card } from 'react-bootstrap';

const ProfileForm = React.lazy(() => import('../components/ProfileForm'));
const AddressesControl = React.lazy(() => import('../components/AddressesControl'));

class SettingsPage extends Component {
  state = {
    defaultActiveTab: null 
  };

  componentDidMount() {
    if (this.props.location.search !== '') {
      let params = new URLSearchParams(this.props.location.search);
      this.setState({
        defaultActiveTab: params.get('tab')
      });
    } else {
      this.setState({
        defaultActiveTab: 'profile'
      });
    }
  }

  render() {
    return (
      this.state.defaultActiveTab &&
      <Tab.Container id="settings-tabs" defaultActiveKey={this.state.defaultActiveTab}>
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item action eventKey="profile">
                Profile
              </ListGroup.Item>
              <ListGroup.Item action eventKey="account">
                Account
              </ListGroup.Item>
              <ListGroup.Item action eventKey="addresses">
                Addresses
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
                    <Tab.Pane eventKey="addresses">
                      <h4>Addresses Control</h4>
                      <AddressesControl />
                    </Tab.Pane>
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