import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import CreateStoreForm from '../components/CreateStoreForm';

class CreateStorePage extends Component {
  render() {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <CreateStoreForm />
        </Col>
      </Row>
    );
  }
}

export default CreateStorePage;