import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

type Children = string | JSX.Element | JSX.Element[];

type Props = {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  children?: Children;
};

const OrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  children,
}: Props) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>ORDER SUMMARY</h4>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${itemsPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${shippingPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${totalPrice}</Col>
          </Row>
        </ListGroup.Item>
        {children}
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
