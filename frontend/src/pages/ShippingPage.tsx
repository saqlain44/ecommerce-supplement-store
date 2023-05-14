import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';

import ShippingAddressForm from '../features/cart/ShippingAddressForm';

const ShippingPage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Meta title="Nutrition-Strat Shipping" />
          <CheckoutSteps step1 step2 />
          <h4 className="mb-3">SHIPPING ADDRESSS</h4>
          <ShippingAddressForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
