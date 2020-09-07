import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleNotch, faTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { formatDateTime } from '../utils';
import discountCodeProvider from '../providers/discountCode.provider';
import dialogProvider from '../providers/core/dialog.provider';

class DiscountCodesControl extends Component {
  state = {
    discountCodes: null,
    loading: false,
    errors: {},
    discountCodeFormData: {
      code: '',
      value: '',
      expiry: ''
    }
  };

  constructor(props) {
    super(props);

    this.addNewDiscountCode = this.addNewDiscountCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.RemoveDiscountCode = this.RemoveDiscountCode.bind(this);
  }

  RemoveDiscountCode(id, index) {
    dialogProvider.open({
      title: 'Remove Discount Code',
      message: 'Are you sure you want to delete this discount code?',
      onCancel: () => {},
      onConfirm: () => {
        discountCodeProvider.deleteDiscountCode(id)
          .then(data => {
            if (data.success) {
              this.setState({
                discountCodes: [
                  ...this.state.discountCodes.slice(0, index),
                  ...this.state.discountCodes.slice(index + 1)
                ]
              });
            }
          });
      }
    })
  }

  addNewDiscountCode() {
    let discountCode = this.state.discountCodeFormData;

    this.setState({
      loading: true,
      errors: {}
    });

    discountCodeProvider.createDiscountCode(this.props.storeId, discountCode)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors, discountCode } = data;

        if (errors) this.setState({ errors });

        if (success) {
          this.setState({
            discountCodes: [
              ...this.state.discountCodes,
              discountCode
            ]
          });
        }
      });
  }

  handleChange(e) {
    let field = e.target.name;
    let value = e.target.value;
    this.setState({
      discountCodeFormData: {
        ...this.state.discountCodeFormData,
        [field]: value
      }
    });
  }

  componentDidMount() {
    this.setState({
      discountCodes: this.props.discountCodes
    });
  }

  render() {
    return (
      this.state.discountCodes &&
      <Table className="bg-white border">
        <thead>
          <tr>
            <th>Code</th>
            <th>Value</th>
            <th>Expiry</th>
            <th className="text-center">Valid</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.discountCodes.map((discountCode, index) => (
            <tr key={index}>
              <td>{discountCode.code}</td>
              <td>{discountCode.value}</td>
              <td>{formatDateTime(discountCode.expiry)}</td>
              <td className="text-center">
                {
                  discountCode.expired
                  ? <FontAwesomeIcon icon={faTimesCircle} className="text-danger"></FontAwesomeIcon>
                  : <FontAwesomeIcon icon={faCheckCircle} className="text-success"></FontAwesomeIcon>
                }
              </td>
              <td className="text-center">
                <Button variant="link" className="text-danger py-0" onClick={e => this.RemoveDiscountCode(discountCode.pk, index)}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control 
                type="text"
                name="code"
                placeholder="Code"
                required
                value={this.state.discountCodeFormData.code}
                onChange={this.handleChange}
                isInvalid={this.state.errors['code']}
              />
            </td>
            <td>
              <Form.Control 
                type="text"
                name="value"
                placeholder="Value"
                required
                value={this.state.discountCodeFormData.value}
                onChange={this.handleChange}
                isInvalid={this.state.errors['value']}
              />
            </td>
            <td>
              <Form.Control 
                type="datetime-local"
                name="expiry"
                placeholder="Expiry"
                required
                value={this.state.discountCodeFormData.expiry}
                onChange={this.handleChange}
                isInvalid={this.state.errors['expiry']}
              />
            </td>
            <td className="text-center">
              <Button variant="link" className="text-primary" disabled={this.state.loading} onClick={this.addNewDiscountCode}>
                { 
                  this.state.loading 
                  ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
                  : <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                }
              </Button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default DiscountCodesControl;