import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import discountCodeProvider from '../providers/discountCode.provider';

class DiscountCodeChecker extends Component {
  state = {
    loading: false,
    errors: null,
    code: ''
  };

  constructor(props) {
    super(props);

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.checkDiscountCode = this.checkDiscountCode.bind(this);
  }

  handleCodeChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkDiscountCode() {
    this.setState({
      error: null,
      loading: true
    });

    discountCodeProvider.getDiscountCode(this.state.code, this.props.order.store.id)
      .then(discountCode => {
        this.setState({ loading: false });

        if (discountCode) {
          this.setState({ code: '' });
          this.props.onDiscountCodeChecked(discountCode);
        } else {
          this.setState({ error: 'This code is expired or desn\'t exist' });
        }
      });
  }

  render() {
    return (
      <>
      <InputGroup>
        <FormControl 
          type="text" 
          name="code" 
          placeholder="Discount Code"
          value={this.state.code} 
          onChange={this.handleCodeChange}
        />
        <InputGroup.Append>
          <Button variant="success" disabled={this.state.loading} onClick={this.checkDiscountCode}>
            { 
              this.state.loading 
              ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
              : 'Redeem'
            }
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {this.state.error && <small className="text-danger">{this.state.error}</small>}
      </>
    );
  }
}

export default DiscountCodeChecker;