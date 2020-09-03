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
    },
    useAlreadyCreatedAddress: false
  };

  constructor(props) { 
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onAddressFormSubmit = this.onAddressFormSubmit.bind(this);
    this.useAlreadyCreatedAddressChange = this.useAlreadyCreatedAddressChange.bind(this);
    this.handleExisitngAddressChange = this.handleExisitngAddressChange.bind(this);
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
    
    if (data.success) this.props.onAddressResolved(data.address);

    if (data.errors) this.setState({ errors: data.errors });
  }

  useAlreadyCreatedAddressChange(e) {
    this.setState({ useAlreadyCreatedAddress: e.target.checked });
    let address = this.props.addresses.edges.map(edge => edge.node)[0];
    this.props.onAddressResolved(address);
  }

  handleExisitngAddressChange(e) {
    let address = this.props.addresses.edges.map(edge => edge.node)[e.target.value];
    this.props.onAddressResolved(address);
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
        {
          this.props.addresses &&
          <Form.Group>
            <Form.Check 
              className="mb-2" 
              type="checkbox" 
              checked={this.state.useAlreadyCreatedAddress}
              onChange={this.useAlreadyCreatedAddressChange} 
              label="Choose already created addresses"
            />
            <Form.Control 
              as="select" 
              custom
              disabled={!this.state.useAlreadyCreatedAddress} 
              onChange={this.handleExisitngAddressChange}
            >
              {this.props.addresses.edges.map(edge => edge.node).map((address, index) => (
                <option key={index} value={index}>{address.formatted}</option>
              ))}
            </Form.Control>
          </Form.Group>
        }
        { this.getErrorFeedbackDOM('nonFieldErrors') }
        <div className="text-right">
          {
            !this.props.readOnly &&
            <Button 
              variant="primary" 
              type="submit" 
              disabled={this.state.loading || this.props.disabled || this.state.useAlreadyCreatedAddress}
            >
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