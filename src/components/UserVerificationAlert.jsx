import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import userProvider from '../providers/user.provider';

class UserVerificationAlert extends Component {

  constructor(props) {
    super(props);

    this.resendActivationLink = this.resendActivationLink.bind(this);
  }

  resendActivationLink(e) {
    userProvider.resendLink(this.props.user.email);
  }

  render() {
    return (
      <Alert variant="warning">
        Please activate your account by clicking the link we sent you to <b>{this.props.user.email}</b>.
        &nbsp;<a onClick={this.resendActivationLink} href="/#">Resend Link</a>
      </Alert>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(UserVerificationAlert);