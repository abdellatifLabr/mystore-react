import React, { Component } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck } from '@fortawesome/free-solid-svg-icons';

import productProvider from '../providers/product.provider';

class EditProductForm extends Component {
  state = {
    loading: false,
    errors: {},
    success: false,
    productFormData: {
      name: '',
      description: '',
      pictures: [],
      quantity: 0,
      price: ''
    },
    pictures: []
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { pictures, price, unitsLeft, quantity, ...productData } = this.props.product;
    let product = {};

    for (let prop in this.state.productFormData) {
      product[prop] = productData[prop];
    }

    this.setState({
      pictures: pictures.edges.map(edge => edge.node)
    });

    this.setState({
      productFormData: {
        ...product,
        price: parseFloat(price.replace(/[^0-9.-]+/g,"")),
        quantity: unitsLeft
      }
    });
  }

  handleChange(e) {
    let field = e.target.name;
    let type = e.target.type;
    let value;

    switch (type) {
      case 'text':
        value = e.target.value;
        break;
      
      case 'textarea':
        value = e.target.value;
        break;

      case 'checkbox':
        value = !!(e.target.checked);
        break;
      
      case 'file':
        value = e.target.files && e.target.files[0];
        break;
      
      case 'number':
        value = parseFloat(e.target.value);
        break;
    
      default:
        break;
    }

    this.setState({
      productFormData: {
        ...this.state.productFormData,
        [field]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true, errors: {}, success: false });

    let fields = this.state.productFormData;

    productProvider.updateProduct(this.props.product.pk, fields)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors, product } = data;

        if (success) this.setState({ success: true });

        if (errors) this.setState({ errors });
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
      <Card>
        <Card.Header className="text-center font-weight-bold">Update Product</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                name="name"
                required
                value={this.state.productFormData.name}
                onChange={this.handleChange}
                isInvalid={this.state.errors['name']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('name') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea"
                name="description"
                required
                value={this.state.productFormData.description}
                onChange={this.handleChange}
                isInvalid={this.state.errors['description']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('description') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                  type="number"
                  min="0"
                  name="quantity"
                  required
                  value={this.state.productFormData.quantity}
                  onChange={this.handleChange}
                  isInvalid={this.state.errors['quantity']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('quantity') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  type="number"
                  min="0"
                  step="any"
                  name="price"
                  required
                  value={this.state.productFormData.price}
                  onChange={this.handleChange}
                  isInvalid={this.state.errors['price']}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('price') }
              </Form.Control.Feedback>
            </Form.Group>
            { this.getErrorFeedbackDOM('nonFieldErrors') }
            <Button variant="primary" type="submit" disabled={this.state.loading}>
              { 
                this.state.loading 
                ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
                : 'Save Changes'
              }
            </Button>
            {
              this.state.success &&
              <Alert variant="success" className="m-0 mt-3">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Product updated successfully
              </Alert>
            }
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default EditProductForm;