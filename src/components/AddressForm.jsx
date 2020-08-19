import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

class AddressForm extends Component {
  render() {
    return (
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>  
        </Row>
        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control />
        </Form.Group>
        <Button variant="primary">Save</Button>
      </Form>
    );
  }
}

export default AddressForm;