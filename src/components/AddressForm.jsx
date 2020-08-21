import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CountryDropdown } from 'react-country-region-selector';

import addressProvider from '../providers/address.provider';

class AddressForm extends Component {
  state = {
    loading: false,
    errors: {},
    addressFormData: {
      country: '',
      city: '',
      street: '',
      postalCode: ''
    }
  };

  constructor(props) { 
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onAddressFormSubmit = this.onAddressFormSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.address) {
      let address = {};

      for (let prop in this.state.addressFormData) {
        address[prop] = this.props.address[prop];
      }

      this.setState({ addressFormData: address });
    }
  }

  onAddressFormSubmit(e) {
    e.preventDefault();

    let address = this.state.addressFormData;

    this.setState({
      loading: true,
      errors: {}
    });

    this.handleAddress(address)
      .then(() => {
        this.setState({ loading: false });
      });
  }

  async handleAddress(address) {
    let data;

    if (this.props.address) {
      data = await addressProvider.updateAddress(this.props.address.pk, address);
    } else {
      data = await addressProvider.createAddress(address);
    }
    
    if (data.success) this.props.onAddressResolved(address);

    if (data.errors) this.setState({ errors: data.errors });
  }

  handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    this.setState({
      addressFormData: {
        ...this.state.addressFormData,
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
      <Form onSubmit={this.onAddressFormSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <CountryDropdown 
                classes={'custom-select ' + (this.state.errors['country'] ? 'is-invalid' : '')} 
                labelType="full"
                valueType="short"
                required
                disabled={this.props.disabled || this.props.readOnly}
                readOnly={this.props.readOnly}
                value={this.state.addressFormData.country}
                onChange={(val) => this.handleChange({ target: { name: 'country', value: val } })}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('country') }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text"
                name="city"
                required
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                value={this.state.addressFormData.city}
                onChange={this.handleChange}
                isInvalid={this.state.errors['city']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('city') }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>  
        </Row>
        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control 
            type="text"
            name="street"
            required
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            value={this.state.addressFormData.street}
            onChange={this.handleChange}
            isInvalid={this.state.errors['street']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('street') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control 
            type="text"
            name="postalCode"
            required
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            value={this.state.addressFormData.postalCode}
            onChange={this.handleChange}
            isInvalid={this.state.errors['postalCode']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('postalCode') }
          </Form.Control.Feedback>
        </Form.Group>
        { this.getErrorFeedbackDOM('nonFieldErrors') }
        <div className="text-right">
          {
            !this.props.readOnly &&
            <Button variant="primary" type="submit" disabled={this.state.loading}>
              { 
                this.state.loading 
                ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
                : 'Save'
              }
            </Button>
          }
        </div>
      </Form>
    );
  }
}

export default AddressForm;