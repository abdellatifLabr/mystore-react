import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button, 
  Container, 
  InputGroup,
  Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

import userProvider from '../providers/user.provider';

class Navigation extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick() {
    userProvider.signOut()
      .then(() => this.props.history.push('/'));
  }
  
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            My Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="mx-auto w-50">
              <InputGroup className="w-100">
                <FormControl type="text" placeholder="Search" className="border-light" />
                <InputGroup.Append>
                  <Button variant="outline-light" className="bg-white text-secondary border-left-0">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
            {
              this.props.user 
              ? <Nav>
                  <Nav.Link as="div">
                    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                    <Badge pill variant="primary" className="ml-2">0</Badge>
                  </Nav.Link>
                  <NavDropdown title={this.props.user.firstName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as="div">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.onSignOutClick}>Sign Out</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              : <Nav>
                  <Link to="/signup">
                    <Button variant="primary" className="mr-sm-2">Sign Up</Button>
                  </Link>
                  <Link to="/signin">
                    <Button variant="outline-primary">Sign In</Button>
                  </Link>
                </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(withRouter(Navigation));