import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import EditStoreForm from '../components/EditStoreForm';
import storeProvider from '../providers/store.provider';

class EditStorePage extends Component {
  state = {
    store: null
  };

  componentDidMount() {
    let storeId = this.props.match.params.id;

    this.setState({ loading: true });

    storeProvider.getStore(storeId)
      .then(store => {
        this.setState({ store, loading: false });
      });
  }

  render() {
    if (!this.state.store) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This store doesn\'t exist'}
        </h4>
      );
    }

    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <EditStoreForm store={this.state.store} />
        </Col>
      </Row>
    );
  }
}

export default EditStorePage;