import React, { Component } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import ImageFilePreview from '../components/ImageFilePreview';
import productPictureProvider from '../providers/productPicture.provider';

class ProductPicturesEditor extends Component {
  state = {
    loading: false,
    success: false,
    pictures: [],
    removedPictures: []
  };

  constructor(props) {
    super(props);

    this.handleAddNewPicture = this.handleAddNewPicture.bind(this);
    this.handleRemovePicture = this.handleRemovePicture.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      pictures: this.props.product.pictures.edges.map(edge => edge.node)
    });
  }

  handleAddNewPicture() {
    this.setState({
      pictures: [
        ...this.state.pictures,
        {
          id: null,
          original: null,
          file: null,
          width: this.state.pictures[0].width,
          height: this.state.pictures[0].height
        }
      ]
    });
  }

  handleRemovePicture(index) {
    this.setState({
      pictures: [
        ...this.state.pictures.slice(0, index),
        ...this.state.pictures.slice(index + 1)
      ]
    });

    if (this.state.pictures[index].id) {
      this.setState({
        removedPictures: [
          ...this.state.removedPictures,
          this.state.pictures[index]
        ]
      });
    }
  }

  handleChange(e, index) {
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

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true, success: false });

    this.state.pictures.forEach((picture, index) => {
      if (picture.file) {
        if (picture.id) {
          productPictureProvider.update(picture.pk, picture.file)
            .then(data => {
              let { success, productPicture } = data;

              if (success) {
                this.setState({
                  pictures: [
                    ...this.state.pictures.splice(0, index),
                    productPicture,
                    ...this.state.pictures.splice(index + 1)
                  ]
                });
              }
            });
        } else {
          productPictureProvider.create(this.props.product.pk, picture.file)
            .then(data => {
              let { success, productPicture } = data;

              if (success) {
                this.setState({
                  pictures: [
                    ...this.state.pictures.splice(0, index),
                    productPicture,
                    ...this.state.pictures.splice(index + 1)
                  ]
                });
              }
            });
        }
      }
    });
  
    for (let picture of this.state.removedPictures) {
      productPictureProvider.delete(picture.pk);
    }

    this.setState({ loading: false, success: true });
  }

  render() {
    return (
      <Card>
        <Card.Header className="text-center font-weight-bold">Update Product Pictures</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            {this.state.pictures.map((picture, index) => (
              <Form.Group key={picture.id}>
                <ImageFilePreview 
                  file={picture.original} 
                  name={picture.id}
                  crop={{
                    unit: 'px',
                    width: picture.width,
                    height: picture.height
                  }}
                  onChange={e => this.handleChange(e, index)}
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

export default ProductPicturesEditor;