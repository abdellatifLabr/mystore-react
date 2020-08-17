import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';

class SubscribeButton extends Component {
  state = {
    subscription: null,
    loading: false
  };

  constructor(props) {
    super(props);

    this.onSubscribeClick = this.onSubscribeClick.bind(this);
    this.onUnsubscribeClick = this.onUnsubscribeClick.bind(this);
  }

  onSubscribeClick() {
    this.setState({ loading: true });

    let storeId = this.props.store.pk;
    storeProvider.subscribe(storeId)
      .then(data => {
        this.setState({ loading: false });
        
        if (data.success) {
          this.setState({ subscription: data.subscription });
        }
      });
  }

  onUnsubscribeClick() {
    this.setState({ loading: true });

    let subId = this.state.subscription.pk;
    storeProvider.unsubscribe(subId)
      .then(data => {
        this.setState({ loading: false });

        if (data.success) {
          this.setState({ subscription: null });
        }
      });
  }

  componentDidMount() {
    let store = this.props.store;

    storeProvider.getSubscription(store.id)
      .then(subscription => {
        if (subscription) {
          this.setState({ subscription });
        }
      });
  }

  render() {
    let subscribed = !!(this.state.subscription);
      
    return (
      <Button 
        variant={subscribed ? 'primary' : 'outline-primary'} 
        disabled={this.state.loading} 
        size={this.props.size} 
        onClick={subscribed ? this.onUnsubscribeClick : this.onSubscribeClick}
      >
        { 
          this.state.loading 
          ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
          : subscribed ? 'Subscribed' : 'Subscribe'
        }
      </Button>
    )
  }
}

export default SubscribeButton;