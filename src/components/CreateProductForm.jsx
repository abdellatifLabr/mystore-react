import React, { Component } from 'react';
import { Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import ImageFilePreview from '../components/ImageFilePreview';
import productProvider from '../providers/product.provider';

class CreateProductForm extends Component {
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
    pictures: [
      { file: null, original: null }
    ]
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemovePicture = this.handleRemovePicture.bind(this);
    this.handleAddNewPicture = this.handleAddNewPicture.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
  }

  handleAddNewPicture() {
    this.setState(state => ({
      pictures: [
        ...state.pictures,
        { file: null, original: null }
      ]
    }));
  }

  handleRemovePicture(index) {
    this.setState({
      pictures: [
        ...this.state.pictures.slice(0, index),
        ...this.state.pictures.slice(index + 1)
      ]
    });
  }

  handlePictureChange(e, index) {
    let file = e.target.files && e.target.files[0];
    let picture = this.state.pictures[index];
    picture.file = file;

    this.setState({
      pictures: [
        ...this.state.pictures.slice(0, index),
        picture,
        ...this.state.pictures.slice(index + 1)
      ]
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
    fields.pictures = this.state.pictures.map(picture => picture.file);

    productProvider.createProduct(this.props.store.pk, fields)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors } = data;

        if (success) this.setState({ success: true });

        if (errors) this.setState({ errors });
      });
  }

  async createProduct() {

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
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6}>
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
                : 'Create'
              }
            </Button>
            {
              this.state.success &&
              <Alert variant="success" className="m-0 mt-3">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Product Created successfully
              </Alert>
            }
          </Col>
          <Col md={6}>
            {this.state.pictures.map((picture, index) => (
              <Form.Group key={index}>
                <ImageFilePreview 
                  file={picture.original} 
                  name={picture.id}
                  crop={{
                    unit: 'px',
                    width: 400,
                    height: 400
                  }}
                  onChange={e => this.handlePictureChange(e, index)}
                  extra={(
                    <Button variant="outline-danger" onClick={e => this.handleRemovePicture(index)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Remove
                    </Button>
                  )}
                />
              </Form.Group>
            ))}
            <Form.Group>
              <Button variant="outline-success" onClick={this.handleAddNewPicture}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Picture
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CreateProductForm;