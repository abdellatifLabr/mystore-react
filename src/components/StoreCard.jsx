import React, { Component } from 'react';
import { Card, Media } from 'react-bootstrap';
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
          <Media>
            <img
              width={32}
              height={32}
              className="mr-2 rounded-circle"
              src={store.logo.original}
              alt={store.name}
            />
            <Media.Body> 
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <Link to={`/store/${store.id}`}>{store.name}</Link> 
                </div>
                <div>
                  {
                    this.props.user &&
                    <SubscribeButton store={store} size="sm" />
                  }
                </div>
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