import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import cartsProvider from '../providers/carts.provider';
import { addCart, removeCart, updateCart } from '../store/actions/carts.actions';

class CartButton extends Component {
  state = {
    cartProduct: null,
    loading: false
  };

  constructor(props) {
    super(props);

    this.onAddToCartClick = this.onAddToCartClick.bind(this);
    this.onRemoveFromCartClick = this.onRemoveFromCartClick.bind(this);
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn() {
    this.props.history.push('/signin');
  }

  onAddToCartClick() {
    this.setState({ loading: true });

    cartsProvider.createCartProduct(this.props.product.pk)
      .then(data => {
        this.setState({ loading: false });

        if (data.success) {
          this.setState({ cartProduct: data.cartProduct });

          if (data.isNewCart) {
            this.props.addCart(data.cart);
          } else {
            this.props.updateCart(data.cart);
          }
        }
      });
  }

  onRemoveFromCartClick() {
    this.setState({ loading: true });

    cartsProvider.deleteCartProduct(this.state.cartProduct.pk)
      .then(data => {
        this.setState({ loading: false });

        if (data.success) {
          if (data.isLastItem) {
            this.props.removeCart(this.state.cartProduct.cart);
          } else {
            this.props.updateCart(data.cart);
          }

          this.setState({ cartProduct: null });
        }
      });
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.carts.forEach(cart => {
        cart.cartProducts.edges.map(edge => edge.node).forEach(cartProduct => {
          if (cartProduct.product.id === this.props.product.id) {
            this.setState({ cartProduct });
          }
        });
      });
    }
  }

  render() {
    let inCart = !!(this.state.cartProduct);
    let { product, user, addCart, removeCart, updateCart, staticContext, ...props } = this.props;

    if (product.unitsLeft === 0) {
      return <strong className="text-warning">SOLD OUT</strong>
    }

    return (
      <Button
        variant={inCart ? 'outline-danger' : 'outline-secondary'}
        disabled={this.state.loading}
        onClick={user ? (inCart ? this.onRemoveFromCartClick : this.onAddToCartClick) : this.gotoSignIn}
        {...props}
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
  carts: state.carts,
  user: state.user
});

export default connect(mapStateToProps, { addCart, removeCart, updateCart })(withRouter(CartButton));