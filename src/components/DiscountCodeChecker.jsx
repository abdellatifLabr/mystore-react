import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import discountCodeProvider from '../providers/discountCode.provider';

class DiscountCodeChecker extends Component {
  state = {
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
      error: null
    });

    discountCodeProvider.getDiscountCode(this.state.code)
      .then(discountCode => {
        if (discountCode) {
          if (discountCode.expired) {
            this.setState({ error: 'Discount code expired!' });
          } else {
            this.setState({ code: '' });
            this.props.onDiscountCodeChecked(discountCode);
          } 
        } else {
          this.setState({ error: 'This code desn\'t exist' });
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
          <Button variant="success" onClick={this.checkDiscountCode}>
            Redeem
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {this.state.error && <small className="text-danger">{this.state.error}</small>}
      </>
    );
  }
}

export default DiscountCodeChecker;