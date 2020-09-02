import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

class ConfirmDialog extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleClose() {
    ReactDOM.unmountComponentAtNode(this.props.container);
    this.props.onCancel();
  }
  
  handleConfirm() {
    ReactDOM.unmountComponentAtNode(this.props.container);
    this.props.onConfirm();
  }

  componentWillUnmount() {
    document.body.removeChild(this.props.container);
  }

  render() {
    let { title, message } = this.props;

    return (
      <Modal show animation={false} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.handleClose}>cancal</Button>
          <Button variant="danger" onClick={this.handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmDialog;