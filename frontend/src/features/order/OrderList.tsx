import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { useOrderListQuery } from './orderApiSlice';

const OrderList = () => {
  const { isLoading, isError, error, data } = useOrderListQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>USER</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order, idx) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.user && order.user.name}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                order.paidAt?.substring(0, 10)
              ) : (
                <i className="fas fa-times" style={{ color: 'red' }}></i>
              )}
            </td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt?.substring(0, 10)
              ) : (
                <i className="fas fa-times" style={{ color: 'red' }}></i>
              )}
            </td>
            <td>
              <LinkContainer to={`/order/${order._id}`}>
                <Button
                  variant="secondary"
                  className="btn-sm"
                  data-cy={`btn-details-${idx}`}
                >
                  Details
                </Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderList;
