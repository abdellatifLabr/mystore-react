import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    ReactDOM.unmountComponentAtNode(this.props.container);
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleClose();
    }, this.props.delay);
  }

  componentWillUnmount() {
    document.body.removeChild(this.props.container);
  }

  render() {
    let content = '';

    switch (this.props.type) {
      case 'PRODUCT_RELEASE':
        let store = this.props.source;
        content = <><strong>{store.name}</strong> {this.props.action}</>;
        break;
      
      case 'SUBSCRIPTION':
        let user = this.props.source;
        content = <><strong>{user.first_name} {user.last_name}</strong> {this.props.action}</>
        break;

      default:
        break;
    }

    return (
      <Toast show={true} onClose={this.handleClose}>
        <Toast.Header>
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>&nbsp;
          <strong className="mr-auto">Notification</strong>
          <small>{this.props.created}</small>
        </Toast.Header>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    );
  }
}

export default Notification;