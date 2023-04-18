import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
