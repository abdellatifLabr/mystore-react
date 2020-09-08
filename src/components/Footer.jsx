import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
  render() {
    return (
      <div className="p-3 bg-dark text-light text-center mt-auto">
        Made with <FontAwesomeIcon icon={faHeart} className="text-danger"></FontAwesomeIcon> by <a href="https://github.com/abdellatifLabr">Abdellatif Labreche</a>
      </div>
    );
  }
}

export default Footer;