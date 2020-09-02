import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class ProductPicturesExplorer extends Component {
  state = {
    active: 0
  };

  constructor(props) {
    super(props);

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(index) {
    this.setState({
      active: index
    });
  }

  render() {
    let pictures = this.props.product.pictures.edges.map(edge => edge.node);

    return (
      <Row>
        <Col md={3}>
          {pictures.map((picture, index) => (
            <Image 
              key={index} 
              src={picture.original} 
              fluid 
              rounded 
              onClick={() => this.handleImageClick(index)}
              className={`mb-2 border ${(this.state.active === index) ? 'border-primary' : ''}`}
            />
          ))}
        </Col>
        <Col>
          <Image 
            src={pictures[this.state.active].original} 
            fluid 
            rounded
          />
        </Col>
      </Row>
    );
  }
}

export default ProductPicturesExplorer;