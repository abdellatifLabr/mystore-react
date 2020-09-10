import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import SignInForm from '../components/SignInForm';

class SignInPage extends Component {
  render() {
    return (
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="vh-100 pt-5">
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4">Sign In</h4>
              <SignInForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignInPage;