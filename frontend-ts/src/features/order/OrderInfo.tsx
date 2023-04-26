import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Message from '../../components/Message';

import { useAppSelector } from '../../app/hooks';

const OrderInfo = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h4>SHIPPING</h4>
        <p>
          <strong>Address: </strong>
          {cart.shippingAddress?.address},{cart.shippingAddress?.city},
          {cart.shippingAddress?.postalCode},{cart.shippingAddress?.country}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h5>PAYMENT METHOD</h5>
        <strong>Method: </strong>
        {cart.paymentMethod}
      </ListGroup.Item>

      <ListGroup.Item>
        <h5>ORDER ITEMS</h5>
        {cart.cartItems && cart.cartItems.length === 0 ? (
          <Message>Your Cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cart.cartItems?.map((item, index) => (
              <ListGroup.Item key={index} data-cy="order-item">
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default OrderInfo;
