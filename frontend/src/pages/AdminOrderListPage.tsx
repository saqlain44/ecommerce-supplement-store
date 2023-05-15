import React from 'react';
import Meta from '../components/Meta';
import OrderList from '../features/order/OrderList';

const AdminOrderListPage = () => {

  return (
    <>
      <Meta />
      <h2>Orders</h2>
      <OrderList />
    </>
  );
};

export default AdminOrderListPage;
