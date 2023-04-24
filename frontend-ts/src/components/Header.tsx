import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setUser } from '../features/auth/authSlice';
import SearchBox from './SearchBox';

// TODO: searchbox

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const logoutHandler = () => {
    dispatch(setUser(null));
  };

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="fixed-top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold">Nutrition-Strat</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer
                to="/collections/protein"
                data-cy="nav-btn-protein"
              >
                <Nav.Link className="fw-bold">Protein</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="Essentials"
                id="basic-nav-dropdown"
                className="fw-bold"
                data-cy="nav-btn-essentials"
              >
                <LinkContainer to="/collections/bcaa" data-cy="nav-btn-bcaa">
                  <NavDropdown.Item>BCAA</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  to="/collections/glutamine"
                  data-cy="nav-btn-glutamine"
                >
                  <NavDropdown.Item>Glutamine</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  to="/collections/creatine"
                  data-cy="nav-btn-creatine"
                >
                  <NavDropdown.Item>Creatine</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title="More"
                id="basic-nav-dropdown"
                className="fw-bold"
                data-cy="nav-btn-more"
              >
                <LinkContainer
                  to="/collections/multivitamin"
                  data-cy="nav-btn-multivitamin"
                >
                  <NavDropdown.Item>Multivitamin</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/collections/omega" data-cy="nav-btn-omega">
                  <NavDropdown.Item>Omega/Fish-Oil</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>

            <Nav className="ml-auto nav-right-items">
              <SearchBox />
              &nbsp; &nbsp; &nbsp;
              {user && user.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  data-cy="nav-btn-admin"
                >
                  <LinkContainer to="/admin/userlist" data-cy="nav-btn-users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer
                    to="/admin/productlist"
                    data-cy="nav-btn-products"
                  >
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist" data-cy="nav-btn-orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {user ? (
                <NavDropdown
                  title={
                    <i className="fas fa-user" style={{ fontSize: '22px' }}></i>
                  }
                  id="username"
                  data-cy="username"
                >
                  <LinkContainer to="/profile" data-cy="nav-profile">
                    <NavDropdown.Item data-cy="profile">
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign-in
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart' data-cy='nav-btn-cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
                  {cartItems && cartItems.length > 0 && (
                    <div
                      className='bg-danger text-center'
                      style={{
                        borderRadius: '50%',
                        height: '18px',
                        width: '18px',
                        display: 'inline-block',
                      }}
                    >
                      <span
                        className='text-center fw-bold'
                        style={{
                          position: 'relative',
                          top: '-5px',
                          fontSize: '12px',
                        }}
                      >
                        {cartItems.length}
                      </span>
                    </div>
                  )}
                  {cartItems && cartItems.length > 0 && (
                    <>
                      <span className='fw-bold'>
                        / $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                      &nbsp;{' '}
                    </>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
