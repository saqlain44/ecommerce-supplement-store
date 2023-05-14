import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Message from './Message';
import type { OrderDetails } from '../features/order/orderApiSlice';

type Props = {
  data?: OrderDetails;
};

const OrderItemsInfo = ({ data }: Props) => {
  return (
    <ListGroup.Item>
      <h5>ORDER ITEMS</h5>
      {data?.orderItems.length === 0 ? (
        <Message>Order is empty!</Message>
      ) : (
        <ListGroup variant="flush">
          {data?.orderItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={1}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col>
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={4}>
                  {item.qty} x ${item.price} = ${item.qty * +item.price}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </ListGroup.Item>
  );
};

export default OrderItemsInfo;
