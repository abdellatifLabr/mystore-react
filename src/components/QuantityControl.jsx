import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import cartProvider from '../providers/cart.provider';
import { updateCartProduct } from '../store/actions/cart.actions';

class QuantityControl extends Component {
  constructor(props) {
    super(props);

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  increaseQuantity() {
    cartProvider.updateCartProduct(this.props.cartProduct.pk, { quantity: this.props.cartProduct.quantity + 1 })
      .then(data => {
        if (data.success) {
          this.props.updateCartProduct(data.cartProduct);
        }
      });
  }

  decreaseQuantity() {
    cartProvider.updateCartProduct(this.props.cartProduct.pk, { quantity: this.props.cartProduct.quantity - 1 })
      .then(data => {
        if (data.success) {
          this.props.updateCartProduct(data.cartProduct);
        }
      });
  }

  render() {
    let cartProduct = this.props.cartProduct;

    return (
      <InputGroup className="w-50">
        <InputGroup.Prepend>
          <Button 
            variant="outline-secondary" 
            size={this.props.size} 
            disabled={cartProduct.product.unitsLeft === 0} 
            onClick={this.increaseQuantity}
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </Button>
        </InputGroup.Prepend>
        <FormControl value={cartProduct.quantity} readOnly size={this.props.size}
          className="text-center border-secondary border-left-0 border-right-0" />
        <InputGroup.Append>
          <Button 
            variant="outline-secondary" 
            size={this.props.size} 
            disabled={cartProduct.quantity === 1} 
            onClick={this.decreaseQuantity}
          >
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { updateCartProduct })(QuantityControl);