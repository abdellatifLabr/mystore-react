import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

class Splash extends Component {
  SPLASH_STYLES = {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  };

  render() {
    return (
      <div style={this.SPLASH_STYLES}>
        <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
      </div>
    );
  }
}

export default Splash;