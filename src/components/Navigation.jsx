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
  Badge,
  OverlayTrigger,
  Popover,
  ListGroup,
  Media,
  Image
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
    let popover = (
      <Popover className="w-25">
        <Popover.Title as="h3">Carts</Popover.Title>
        <Popover.Content className="p-0">
          <ListGroup variant="flush">
            {
              this.props.carts.length > 0 ? (
                this.props.carts.edges.map(edge => edge.node).map(cart => (
                  <Link to={`/cart/${cart.id}`} key={cart.id}>
                    <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                      <div>
                        <Media className="d-flex align-items-center">
                          <Image
                            width={32}
                            height={32}
                            className="mr-3 rounded-circle"
                            src={cart.store.logo.original}
                            alt={cart.store.name}
                          />
                          <Media.Body>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">{cart.store.name}</div>
                            </div>
                          </Media.Body>
                        </Media>
                      </div>
                      <div>
                        <Badge size="sm" variant="info">{cart.cartProducts.edges.length}</Badge>
                      </div>
                    </ListGroup.Item>
                  </Link>
                ))
              ) : (
                <div className="p-2 text-center text-secondary">No carts available</div>
              )
            }
          </ListGroup>
        </Popover.Content>
      </Popover>
    );

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              My Store
            </Navbar.Brand>
          </Link>
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
                  <Nav.Link as="div" className={this.props.carts.length > 0 ? 'text-primary' : ''}>
                    <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popover}>
                      <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                    </OverlayTrigger>
                  </Nav.Link>
                  <NavDropdown title={this.props.user.firstName} id="user-nav-dropdown">
                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                    <Link to="/dashboard">
                    <NavDropdown.Item as="div">Dashboard</NavDropdown.Item>
                    </Link>
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
  user: state.user,
  carts: state.carts
});

export default connect(mapStateToProps, {})(withRouter(Navigation));