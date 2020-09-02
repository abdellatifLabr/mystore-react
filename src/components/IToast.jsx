import React, { Component } from 'react';

class IToast extends Component {
  render() {
    let { header, body, delay } = this.props;

    return (
      <Toast show autohide delay={delay || 3000}>
        <Toast.Header>{header}</Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    );
  }
}

export default IToast;