import React from 'react';
import ReactDOM from 'react-dom';

import Notification from '../../components/Notification';

class NotificationProvider {
  DELAY = 10000;

  show(props) {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = '20px';
    div.style.bottom = '20px';
    div.style.width = '30%';
    ReactDOM.render(
      <Notification container={div} delay={this.DELAY} {...props} />,
      document.body.appendChild(div)
    );
  }
}

export default new NotificationProvider();