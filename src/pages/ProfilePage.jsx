import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import userProvider from '../providers/user.provider';

class ProfilePage extends Component {
  state = {
    user: null,
    loading: false
  };

  componentDidMount() {
    let userId = this.props.match.params.id;

    if (!userId) {
      this.setState({ loading: true });

      userProvider.me()
        .then(me => {
          this.setState({ loading: false });

          if (me) {
            this.setState({ user: me });
          }
        });
    } else {
      this.setState({ loading: true });

      userProvider.getUser(userId)
        .then(user => {
          this.setState({ loading: false });

          if (user) {
            this.setState({ user });
          }
        });
    }
  }

  render() {
    if (!this.state.user) {
      return (
        <h4 className="text-secondary text-center">
          {this.state.loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : 'This user doesn\'t exist'}
        </h4>
      );
    }

    let { profile, firstName, lastName, email } = this.state.user;

    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Image
                src={profile.avatar.original}
                width="128"
                height="128"
                roundedCircle
                thumbnail
                fluid
              />
              <div className="mb-3">
                <h3>{firstName} {lastName}</h3>
                <small className="text-secondary">{email}</small>
              </div>
              <p>{profile.bio}</p>
              <phone>{profile.phone}</phone>
              {
                this.state.user.id === this.props.user.id &&
                <div className="mt-3">
                  <Link to="/settings?tab=profile">
                  <Button variant="outline-secondary" size="sm">Edit Profile</Button>
                  </Link>
                </div>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(ProfilePage);