import React from 'react';
import { Col, Row } from 'react-bootstrap';

import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import OrderInfo from '../features/order/OrderInfo';
import PlaceOrder from '../features/order/PlaceOrder';

const PlaceOrderPage = () => {
  return (
    <>
      <Meta title="Nutrition-Strat Place Order" />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <OrderInfo />
        </Col>
        <Col md={4}>
          <PlaceOrder />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
