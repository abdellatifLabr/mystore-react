import React, { Component } from 'react';
import { Card, Media, Image, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartButton from '../components/CartButton';
import productProvider from '../providers/product.provider';

class ProductCard extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    let productId = this.props.product.pk;
    productProvider.deleteProduct(productId)
      .then(data => {
        if (data.success) this.props.onDelete();
      });
  }

  render() {
    let product = this.props.product;
    let visitorIsOwner = this.props.user && this.props.user.id === product.store.user.id;

    return (
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center p-2">
          <div>
            <Media className="d-flex align-items-center">
              <Image
                width={32}
                height={32}
                className="mr-2"
                src={product.store.logo.original}
                alt={product.store.name}
                roundedCircle
                fluid
              />
              <Media.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Link to={`/store/${product.store.id}`}>{product.store.name}</Link> 
                  </div>
                </div>
              </Media.Body>
            </Media>
          </div>
          {
            visitorIsOwner &&
            <div>
              <Dropdown alignRight>
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-secondary" size="sm">
                  <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to={`/product/${this.props.product.id}/edit`}> 
                    <Dropdown.Item as="div">Edit</Dropdown.Item>
                  </Link>
                  <Dropdown.Item className="text-danger" onClick={this.handleDelete}>Remove</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          }
        </Card.Header>
        <Card.Img variant="top" src={product.pictures.edges[0].node.original} />
        <Card.Body className="d-flex justify-content-between align-items-center p-2">
          <div>
            <strong>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </strong>
          </div>
          <div>
            <strong>{product.price}</strong>
          </div>
        </Card.Body>
        <Card.Footer className="p-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <CartButton size="sm" product={product} />
            </div>
          </div>
        </Card.Footer>
      </Card>
    );  
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(ProductCard);