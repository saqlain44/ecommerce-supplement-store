import React from 'react';
import { ListGroup } from 'react-bootstrap';
import type { OrderDetails } from '../features/order/orderApiSlice';
import Message from './Message';

type Props = {
  data?: OrderDetails;
  orderId: string;
};

const OrderUserDeliverInfo = ({ data, orderId }: Props) => {
  return (
    <ListGroup.Item>
      <h4>ORDER : &nbsp; {orderId}</h4>
      <p>
        <strong>Name: </strong>
        {data?.user.name}
      </p>
      <p>
        <strong>Email: </strong>
        {data?.user.email}
      </p>
      <p>
        <strong>Address: </strong>
        {data?.shippingAddress.address},&nbsp;
        {data?.shippingAddress.city},&nbsp;
        {data?.shippingAddress.postalCode},&nbsp;
        {data?.shippingAddress.country}
      </p>
      {data?.isDelivered ? (
        <Message variant="success" time={3000000}>
          <div>Delivered on {data?.deliveredAt?.substring(0, 10)}</div>
        </Message>
      ) : (
        <Message variant="danger" time={3000000}>
          Not Delivered
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default OrderUserDeliverInfo;
