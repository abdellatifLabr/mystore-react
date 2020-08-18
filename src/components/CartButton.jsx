import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import cartProvider from '../providers/cart.provider';
import { addProductToCart, removeProductFromCart } from '../store/actions/cart.actions';

class CartButton extends Component {
  state = {
    inCart: false,
    loading: false
  };

  constructor(props) {
    super(props);

    this.onAddToCartClick = this.onAddToCartClick.bind(this);
    this.onRemoveFromCartClick = this.onRemoveFromCartClick.bind(this);
  }

  onAddToCartClick() {
    this.setState({ loading: true });

    cartProvider.createCartProduct(this.props.product.pk)
      .then(data => {
        this.setState({ loading: false });

        if (data.success) {
          this.props.addProductToCart(data.cartProduct);
          this.setState({ inCart: true });
        }
      });
  }

  onRemoveFromCartClick() {
    this.setState({ loading: true });

    cartProvider.deleteCartProduct(this.props.product.pk)
      .then(data => {
        this.setState({ loading: false });

        if (data.success) {
          this.props.removeProductFromCart(this.props.product.id);
          this.setState({ inCart: false });
        }
      });
  }

  componentDidMount() {
    let inCart = this.props.cart.some(cartProduct => cartProduct.product.id === this.props.product.id);
    this.setState({ inCart });
  }

  render() {
    let inCart = this.state.inCart;

    if (this.props.product.unitsLeft === 0) {
      return <strong className="text-warning">SOLD OUT</strong>
    }

    return (
      <Button
        variant={inCart ? 'outline-danger' : 'outline-secondary'}
        disabled={this.state.loading}
        size={this.props.size}
        onClick={inCart ? this.onRemoveFromCartClick : this.onAddToCartClick}
      >
        { 
          this.state.loading 
          ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
          : (<><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> {inCart ? ' Remove' : ' Add'}</>)
        }
      </Button>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { addProductToCart, removeProductFromCart })(CartButton);