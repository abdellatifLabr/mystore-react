import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Media, Image } from 'react-bootstrap';

class UsersList extends Component {
  render() {
    return (
      <Row>
        {this.props.users.map((user, index) => (
          <Col key={index} md={6}>
            <Media className="d-flex align-items-center">
              <Image
                width={32}
                height={32}
                className="mr-2"
                src={user.profile.avatar.original}
                roundedCircle
                fluid
              />
              <Media.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Link to={`/user/${user.id}`}>{user.firstName} {user.lastName}</Link> 
                  </div>
                </div>
              </Media.Body>
            </Media>
          </Col>
        ))}
      </Row>
    );
  }
}

export default UsersList;