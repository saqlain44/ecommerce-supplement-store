import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Meta from '../components/Meta';
import ProductDetail from '../features/product/ProductDetail';

const ProductDetailPage = () => {
  console.log('ProductDetailPage');
  return (
    <div>
      <Meta />
      <Row>
        <Col>
          <ProductDetail />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
