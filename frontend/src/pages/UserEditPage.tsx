import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';
import UserEditForm from '../features/user/UserEditForm';

const UserEditPage = () => {
  return (
    <>
      <Meta title="Nutrition-Strat User-Edit" />
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Edit user</h1>
            <UserEditForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditPage;
