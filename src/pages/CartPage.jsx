import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Media, Image, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';

import cartsProvider from '../providers/carts.provider';
import orderProvider from '../providers/order.provider';
import QuantityControl from '../components/QuantityControl';
import CartSummary from '../components/CartSummary';
import { updateCart, removeCart } from '../store/actions/carts.actions';

class CartPage extends Component {
  state = {
    loading: false,
    cart: null
  };

  constructor(props) {
    super(props);

    this.onProceedToCheckoutClick = this.onProceedToCheckoutClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onCartProductUpdated = this.onCartProductUpdated.bind(this);
  }

  onProceedToCheckoutClick() {
    this.setState({ loading: true });

    this.prepareOrder()
      .then(order => {
        this.setState({ loading: false });

        if (order) {
          this.props.history.push(`/order/${order.id}`);
        } else {
          // notify error
        }
      });
  }

  async prepareOrder() {
    let createOrder = await orderProvider.createOrder();

    if (createOrder.success) {
      await this.props.cart.forEach(async cartProduct => {
        let orderId = createOrder.order.pk;
        let quantity = cartProduct.quantity;
        let productId = cartProduct.product.pk;
        await orderProvider.createOrderItem(orderId, quantity, productId);
      });
      
      await cartsProvider.deleteAllCartProducts();

      return createOrder.order;
    }

    return;
  }

  onRemoveClick(cartProductId) {
    cartsProvider.deleteCartProduct(cartProductId)
      .then(data => {
        if (data.success) {
          if (data.isLastItem) {
            this.props.removeCart(this.state.cart);
            this.props.history.push('/');
          } else {
            this.setState({ cart: data.cart });
            this.props.updateCart(data.cart);
          }
        }
      });
  }

  onCartProductUpdated(cart) {
    this.setState({ cart });
  }

  componentDidMount() {
    this.setState({ loading: true });

    let cartId = this.props.match.params.id;
    cartsProvider.getCart(cartId)
      .then(cart => {
        this.setState({ loading: false });

        if (cart) {
          this.setState({ cart });
        }
      });
  }

  render() {
    const cart = this.state.cart;

    if (!cart) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This cart doesn\'t exist'}
        </h4>
      );
    }
    
    return (
      <Row className="mb-3" key={cart.id}>
        <Col md={9}>
          <Card>
            <Card.Header>
            <Media className="d-flex align-items-center">
              <Image
                width={32}
                height={32}
                className="mr-3"
                src={cart.store.logo.original}
                alt={cart.store.name}
                roundedCircle
                fluid
              />
              <Media.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Link to={`/store/${cart.store.id}`}>{cart.store.name}</Link> 
                  </div>
                </div>
              </Media.Body>
            </Media>
            </Card.Header>
            <ListGroup variant="flush">
              {cart.cartProducts.edges.map(edge => edge.node).map((cartProduct) => (
                <ListGroup.Item key={cartProduct.id} className="d-flex">
                  <div>
                    <Button variant="link" className="text-danger p-0 mr-2" onClick={() => this.onRemoveClick(cartProduct.pk)}>
                      <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </Button>
                  </div>
                  <div className="w-25">
                    <Image src={cartProduct.product.pictures[0].original} fluid></Image>
                  </div>
                  <div className="ml-2 py-2 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h4>{cartProduct.product.name}</h4>
                      <p className="text-secondary">{cartProduct.product.description}</p>
                      <span className="font-weight-bold">{cartProduct.product.price.value}</span>
                    </div>
                  </div>
                  <div>
                    <QuantityControl cartProduct={cartProduct} onUpdate={this.onCartProductUpdated} size="sm" />
                  </div>
                  <div className="text-success font-weight-bold">
                    {cartProduct.cost}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <CartSummary cart={cart} />
          <Button 
            variant="primary" 
            className="mt-2" 
            block 
            disabled={this.state.loading} 
            onClick={this.onProceedToCheckoutClick}
          >
            {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'Proceed to Checkout'}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { updateCart, removeCart })(CartPage);