import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

class StoreUserOptions extends Component {
  render() {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-secondary">
          <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link to={`/store/${this.props.store.id}/edit`}> 
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default StoreUserOptions;