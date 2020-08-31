import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

class ProductUserOptions extends Component {
  render() {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-secondary" size="sm">
          <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link to={`/product/${this.props.product.id}/edit`}> 
            <Dropdown.Item as="div">Edit</Dropdown.Item>
          </Link>
          <Dropdown.Item as="div" className="text-danger">Remove</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ProductUserOptions;