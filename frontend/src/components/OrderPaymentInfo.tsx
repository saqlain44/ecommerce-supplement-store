import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Message from './Message';
import type { OrderDetails } from '../features/order/orderApiSlice';

type Props = {
  data?: OrderDetails;
};

const OrderPaymentInfo = ({ data }: Props) => {
  return (
    <ListGroup.Item>
      <h5>PAYMENT METHOD</h5>
      <p>
        <strong>Method: </strong>
        {data?.paymentMethod}
      </p>
      {data?.isPaid ? (
        <Message variant="success" time={3000000}>
          <div>Paid on {data?.paidAt?.substring(0, 10)}</div>
        </Message>
      ) : (
        <Message variant="danger" time={3000000}>
          Not Paid
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default OrderPaymentInfo;
