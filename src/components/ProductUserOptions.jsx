import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import productProvider from '../providers/product.provider';

class ProductUserOptions extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    let id = this.props.product.pk;
    productProvider.deleteProduct(id)
      .then(() => {});
  }

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
          <Dropdown.Item as="div" className="text-danger" onClick={this.handleDelete}>Remove</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default ProductUserOptions;