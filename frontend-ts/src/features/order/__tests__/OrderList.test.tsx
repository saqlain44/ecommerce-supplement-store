import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import TestAppWrapper from '../../../services/TestAppWrapper';
import OrderList from '../OrderList';
import orderlist from './data/orderlist';

test('list all orders for admin', async () => {
  render(
    <TestAppWrapper>
      <OrderList />
    </TestAppWrapper>
  );

  await waitFor(() => screen.getByText(orderlist[0]._id));
  expect(screen.getByText(orderlist[0]._id)).toBeInTheDocument();
});
