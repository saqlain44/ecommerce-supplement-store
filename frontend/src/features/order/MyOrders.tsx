import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { useMyOrdersQuery } from './orderApiSlice';

const MyOrders = () => {
  const { isError, isLoading, error, data } = useMyOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error}/>;
  }

  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order) => (
          <tr key={order._id} data-cy="order-list">
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>${order.totalPrice}</td>
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
                  className="btn-sm btn-block"
                  variant="secondary"
                  data-cy="btn-details"
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

export default MyOrders;
