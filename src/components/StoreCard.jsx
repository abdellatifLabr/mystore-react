import React, { Component } from 'react';
import { Card, Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SubscribeButton from '../components/SubscribeButton';

class StoreCard extends Component {
  render() {
    let store = this.props.store;

    return (
      <Card>
        <Card.Img variant="top" src={store.cover.original} />
        <Card.Body>
          <Media className="d-flex align-items-center">
            <Image
              width={32}
              height={32}
              src={store.logo.original}
              alt={store.name}
              fluid
              roundedCircle
              className="mr-2"
            />
            <Media.Body className="d-flex align-items-center"> 
              <div className="flex-grow-1">
                <Link to={`/store/${store.id}`}>{store.name}</Link> 
              </div>
              <div>
                {
                  this.props.user && this.props.user.id != store.user.id &&
                  <SubscribeButton store={store} size="sm" />
                }
              </div>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(StoreCard);