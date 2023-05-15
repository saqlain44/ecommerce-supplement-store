import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import myorders from './data/myorders';
import TestAppWrapper from '../../../services/TestAppWrapper';
import MyOrders from '../MyOrders';

test('show myorders', async () => {
  render(
    <TestAppWrapper>
      <MyOrders />
    </TestAppWrapper>
  );

  await waitFor(() => new Promise((r) => setTimeout(r, 50)));
  await waitFor(() => screen.getByText(myorders[0]._id));
  expect(screen.getByText(myorders[0]._id)).toBeInTheDocument();
});
