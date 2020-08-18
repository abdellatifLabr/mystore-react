import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import userProvider from '../providers/user.provider';
import { setUser } from '../store/actions/user.actions';
import cartProvider from '../providers/cart.provider';
import { addProductToCart } from '../store/actions/cart.actions';

class SignInForm extends Component {
  state = {
    loading: false,
    errors: {},
    signInFormData: {
      username: '',
      password: ''
    }
  };

  constructor(props) { 
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSignInFormSubmit = this.onSignInFormSubmit.bind(this);
  }

  onSignInFormSubmit(e) {
    e.preventDefault();

    this.setState({
      errors: {},
      loading: true
    });

    let { username, password } = this.state.signInFormData;
    this.signIn(username, password);
  }

  async signIn(username, password) {
    let { success, errors } = await userProvider.signIn(username, password);

    this.setState({ loading: false });

    if (errors) this.setState({ errors });

    if (success) {
      let user = await userProvider.me();
      this.props.setUser(user);

      let cartProducts = await cartProvider.getCartProducts(user.id);
      cartProducts.forEach(cartProduct => this.props.addProductToCart(cartProduct));

      this.props.history.push('/')
    }
  }

  handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    this.setState(state => {
      return {
        signInFormData: {
          ...state.signInFormData,
          [field]: value
        }
      }
    });
  }

  getErrorFeedbackDOM(fieldName) {
    if (this.state.errors[fieldName]) {
      return (      
        <ul className="text-danger">
          { 
            this.state.errors[fieldName].map(error => (
              <li key={error.code}>{ error.message }</li>
            ))
          }
        </ul>  
      )
    }
    return;
  }

  render() {
    return (
      <Form onSubmit={this.onSignInFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            id="username"
            required
            onChange={this.handleChange}
            isInvalid={this.state.errors['username']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('username') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            id="password"
            required 
            onChange={this.handleChange}
            isInvalid={this.state.errors['password']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('password') }
          </Form.Control.Feedback>
        </Form.Group>
        { this.getErrorFeedbackDOM('nonFieldErrors') }
        <Button type="submit" block>
          { 
            this.state.loading 
            ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
            : 'Sign In'
          }
        </Button>
      </Form>
    );
  }
}

export default connect(null, { setUser, addProductToCart })(withRouter(SignInForm));