import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CountryDropdown } from 'react-country-region-selector';

import addressProvider from '../providers/address.provider';

class AddressesControl extends Component {
  state = {
    addresses: null,
    loading: false,
    errors: {},
    addressFormData: {
      country: '',
      city: '',
      street: '',
      postalCode: ''
    }
  }

  constructor(props) {
    super(props);

    this.addNewAddress = this.addNewAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.RemoveAddress = this.RemoveAddress.bind(this);
  }

  RemoveAddress(id, index) {
    addressProvider.deleteAddress(id)
      .then(data => {
        if (data.success) {
          this.setState({
            addresses: [
              ...this.state.addresses.slice(0, index),
              ...this.state.addresses.slice(index + 1)
            ]
          });
        }
      });
  }

  addNewAddress() {
    let address = this.state.addressFormData;

    this.setState({
      loading: true,
      errors: {}
    });

    addressProvider.createAddress(address)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors, address } = data;

        if (errors) this.setState({ errors });

        if (success) {
          this.setState({
            addresses: [
              ...this.state.addresses,
              address
            ]
          });
        }
      });
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

  componentDidMount() {
    addressProvider.getMyAddresses()
      .then(addresses => {
        if (addresses) {
          this.setState({
            addresses: addresses.edges.map(edge => edge.node)
          });
        }
      });
  }

  render() {
    if (!this.state.addresses) {
      return null;
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.addresses.map((address, index) => (
            <tr key={index}>
              <td>{address.countryName}</td>
              <td>{address.city}</td>
              <td style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {address.street}
              </td>
              <td>{address.postalCode}</td>
              <td className="text-center">
                <Button variant="link" className="text-danger p-0" onClick={e => this.RemoveAddress(address.pk, index)}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <CountryDropdown 
                classes={'custom-select ' + (this.state.errors['country'] ? 'is-invalid' : '')} 
                labelType="full"
                valueType="short"
                required
                value={this.state.addressFormData.country}
                onChange={(val) => this.handleChange({ target: { name: 'country', value: val } })}
              />
            </td>
            <td>
              <Form.Control 
                type="text"
                name="city"
                required
                value={this.state.addressFormData.city}
                onChange={this.handleChange}
                isInvalid={this.state.errors['city']}
              />
            </td>
            <td>
              <Form.Control 
                type="text"
                name="street"
                required
                value={this.state.addressFormData.street}
                onChange={this.handleChange}
                isInvalid={this.state.errors['street']}
              />
            </td>
            <td>
              <Form.Control 
                type="text"
                name="postalCode"
                required
                value={this.state.addressFormData.postalCode}
                onChange={this.handleChange}
                isInvalid={this.state.errors['postalCode']}
              />
            </td>
            <td className="text-center">
              <Button variant="link" className="text-primary" disabled={this.state.loading} onClick={this.addNewAddress}>
                { 
                  this.state.loading 
                  ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
                  : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                }
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default AddressesControl;