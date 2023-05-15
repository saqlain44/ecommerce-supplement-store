import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Meta from '../components/Meta';
import AdminProductCreateBtn from '../features/product/AdminProductCreateBtn';
import AdminProductList from '../features/product/AdminProductList';

const AdminProductListPage = () => {

  return (
    <>
      <Meta title="Nutrition-Strat Product-List" />
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-right">
          <AdminProductCreateBtn />
        </Col>
      </Row>
      <AdminProductList />
    </>
  );
};

export default AdminProductListPage;
