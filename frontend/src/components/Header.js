import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Row,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faSignIn,
  faSignOut,
  faUsers,
  faTasks,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Simple Orders System</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              {userInfo && userInfo.isAdmin ? (
                ""
              ) : (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <span className="me-1">Cart</span>
                    ْ <FontAwesomeIcon icon={faCartShopping} />
                    {cartItems.length > 0 ? (
                      <Badge bg="danger" className="count">
                        {cartItems.length}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile <FontAwesomeIcon icon={faUser} />
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout <FontAwesomeIcon icon={faSignOut} />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Login <FontAwesomeIcon icon={faSignIn} />
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="adminmenue">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      Users <FontAwesomeIcon icon={faUsers} />
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      Products <FontAwesomeIcon icon={faStar} />
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      Orders <FontAwesomeIcon icon={faTasks} />
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
