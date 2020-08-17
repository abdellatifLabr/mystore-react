import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';

import userProvider from '../providers/user.provider';

class ActivationPage extends Component {
  state = {
    success: false,
    error: false
  };

  componentDidMount() {
    let token = this.props.match.params.token;
    if (!token) this.props.history.push('/');

    this.activate(token);
  }

  async activate(token) {
    let { success, errors } = await userProvider.activate(token);

    if (errors) this.setState({ error: true });

    if (success) this.setState({ success: true });
  }

  render() {
    return (
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              {
                this.state.success &&
                <h4 className="text-success text-center">Activated Successfully!</h4>
              }
              {
                this.state.error &&
                <h4 className="text-danger text-center">Invalid token!</h4>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(null, {})(ActivationPage);