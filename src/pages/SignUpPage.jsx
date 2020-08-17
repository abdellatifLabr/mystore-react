import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import SignUpForm from '../components/SignUpForm';

class SignUpPage extends Component {
  render() {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4">Sign Up</h4>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SignUpPage;