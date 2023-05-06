import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Meta from '../components/Meta';
import AdminProductEditForm from '../features/product/AdminProductEditForm';

const AdminProductEditPage = () => {

  return (
    <>
      <Meta title='Nutrition-Strat Edit Product'/>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h3>EDIT PRODUCT</h3>
            <AdminProductEditForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminProductEditPage;
