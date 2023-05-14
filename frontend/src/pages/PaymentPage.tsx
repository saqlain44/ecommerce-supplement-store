import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import PaymentMethodForm from '../features/cart/PaymentMethodForm';

const PaymentPage = () => {
  const navigate = useNavigate();

  const shippingAddress = useAppSelector((state) => state.cart.shippingAddress);

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Meta title="Nutrition-Strat Payment" />
          <CheckoutSteps step1 step2 step3 />
          <h4 className="mb-3">PAYMENT METHOD</h4>
          <PaymentMethodForm />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
