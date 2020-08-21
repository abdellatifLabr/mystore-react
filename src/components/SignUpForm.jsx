import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import userProvider from '../providers/user.provider';
import { setUser } from '../store/actions/user.actions';

class SignUpForm extends Component {
  state = {
    loading: false,
    errors: {},
    signUpFormData: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
  };

  constructor(props) { 
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSignUpFormSubmit = this.onSignUpFormSubmit.bind(this);
  }

  onSignUpFormSubmit(e) {
    e.preventDefault();

    this.setState({
      errors: {},
      loading: true
    });

    let user = this.state.signUpFormData;
    this.signUp(user);
  }

  async signUp(user) {
    let { success, errors } = await userProvider.signUp(user);

    this.setState({ loading: false });

    if (errors) this.setState({ errors });

    if (success) {
      let user = await userProvider.me();
      this.props.setUser(user);
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    this.setState({
      signUpFormData: {
        ...this.state.signUpFormData,
        [field]: value
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
      <Form onSubmit={this.onSignUpFormSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="firstName">Firstname</Form.Label>
              <Form.Control 
                type="text"
                name="firstName"
                id="firstName"
                required
                onChange={this.handleChange}
                isInvalid={this.state.errors['firstName']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('firstName') }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="lastName">Lastname</Form.Label>
              <Form.Control 
                type="text"
                name="lastName"
                id="lastName"
                required
                onChange={this.handleChange}
                isInvalid={this.state.errors['lastName']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('lastName') }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
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
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control 
            type="text"
            name="email"
            id="email"
            required
            onChange={this.handleChange}
            isInvalid={this.state.errors['email']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('email') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password1">Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password1"
            id="password1"
            required 
            onChange={this.handleChange}
            isInvalid={this.state.errors['password1']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('password1') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password2">Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password2"
            id="password2"
            required 
            onChange={this.handleChange}
            isInvalid={this.state.errors['password2']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('password2') }
          </Form.Control.Feedback>
        </Form.Group>
        { this.getErrorFeedbackDOM('nonFieldErrors') }
        <Button type="submit" block disabled={this.state.loading}>
          { 
            this.state.loading 
            ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
            : 'Sign Up'
          }
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { setUser })(withRouter(SignUpForm));