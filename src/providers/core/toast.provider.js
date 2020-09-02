import React from 'react';
import ReactDOM from 'react-dom';

import IToast from '../../components/IToast';

class ToastProvider {
  open(props) {
    const div = document.createElement('div');
    ReactDOM.render(
      <IToast container={div} {...props} />,
      document.body.appendChild(div)
    );
  }
}

export default new ToastProvider();