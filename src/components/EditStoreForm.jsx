import React, { Component } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck } from '@fortawesome/free-solid-svg-icons';

import ImageFilePreview from '../components/ImageFilePreview';
import storeProvider from '../providers/store.provider';

class EditStoreForm extends Component {
  state = {
    loading: false,
    errors: {},
    success: false,
    storeFormData: {
      cover: '',
      logo: '',
      name: '',
      description: '',
      closed: false,
      shipping: ''
    }
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { logo, cover, shipping, ...storeData } = this.props.store;
    let store = {};

    for (let prop in this.state.storeFormData) {
      store[prop] = storeData[prop];
    }

    this.setState({
      storeFormData: {
        ...store,
        shipping: parseFloat(shipping.replace(/[^0-9.-]+/g,""))
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
      storeFormData: {
        ...this.state.storeFormData,
        [field]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true, errors: {}, success: false });

    let fields = this.state.storeFormData;

    storeProvider.updateStore(this.props.store.pk, fields)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors } = data;

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
      <Form onSubmit={this.handleSubmit}>
        <Card>
          <Card.Header className="text-center font-weight-bold">Update Store</Card.Header>
          <Card.Body>
            <Form.Group>
              <ImageFilePreview 
                label="Cover"
                file={this.props.store.cover.original} 
                crop={{
                  unit: 'px',
                  width: this.props.store.cover.width,
                  height: this.props.store.cover.height
                }}
                name="cover"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('cover') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <ImageFilePreview 
                label="Logo"
                file={this.props.store.logo.original} 
                crop={{
                  unit: 'px',
                  width: this.props.store.logo.width,
                  height: this.props.store.logo.height
                }}
                circularCrop
                name="logo"
                onChange={this.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('logo') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                name="name"
                required
                value={this.state.storeFormData.name}
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
                value={this.state.storeFormData.description}
                onChange={this.handleChange}
                isInvalid={this.state.errors['description']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('description') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Shipping</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  type="number"
                  min="0"
                  step="any"
                  name="shipping"
                  required
                  value={this.state.storeFormData.shipping}
                  onChange={this.handleChange}
                  isInvalid={this.state.errors['shipping']}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('shipping') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check 
                type="checkbox"
                name="closed"
                label="Closed"
                checked={this.state.storeFormData.closed}
                onChange={this.handleChange}
                isInvalid={this.state.errors['closed']}
              />
              <Form.Control.Feedback type="invalid">
                { this.getErrorFeedbackDOM('closed') }
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
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Store updated successfully
              </Alert>
            }
          </Card.Body>
        </Card>
      </Form>
    );
  }
}

export default EditStoreForm;