import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='fw-bold'>Nutrition-Strat</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/collections/protein'>
                <Nav.Link className='fw-bold'>Protein</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title='Essentials'
                id='basic-nav-dropdown'
                className='fw-bold'
              >
                <LinkContainer to='/collections/bcaa'>
                  <NavDropdown.Item>BCAA</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/collections/glutamine'>
                  <NavDropdown.Item>Glutamine</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/collections/creatine'>
                  <NavDropdown.Item>Creatine</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title='More'
                id='basic-nav-dropdown'
                className='fw-bold'
              >
                <LinkContainer to='/collections/multivitamin'>
                  <NavDropdown.Item>Multivitamin</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/collections/omega'>
                  <NavDropdown.Item>Omega/Fish-Oil</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
            <Nav className='ml-auto nav-right-items'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              &nbsp; &nbsp; &nbsp;
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown
                  title={
                    <i className='fas fa-user' style={{ fontSize: '22px' }}></i>
                  }
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign-in
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <span className='fw-bold'>Cart &nbsp; / &nbsp;</span>
                  {cartItems && cartItems.length > 0 && (
                    <>
                      <span className='fw-bold'>
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                      &nbsp;{' '}
                    </>
                  )}
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
