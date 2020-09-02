import React from 'react';
import ReactDOM from 'react-dom';

import ConfirmDialog from '../../components/ConfirmDialog';

class DialogProvider {
  open(props) {
    const div = document.createElement('div');
    ReactDOM.render(
      <ConfirmDialog container={div} {...props} />,
      document.body.appendChild(div)
    );
  }
}

export default new DialogProvider();