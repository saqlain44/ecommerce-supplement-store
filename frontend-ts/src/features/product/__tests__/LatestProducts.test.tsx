import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import TestAppWrapper from '../../../services/TestAppWrapper';
import LatestProducts from '../LatestProducts';

import * as latestProducts from './data/latestProducts.json';

test('Check latest products shows', async () => {
  render(
    <TestAppWrapper>
      <LatestProducts />
    </TestAppWrapper>
  );

  await waitFor(() => screen.findByText(latestProducts.products[0].name));
  // screen.debug();
  //console.log(store.getState())
  expect(screen.getByText(latestProducts.products[0].name)).toBeInTheDocument();

  expect(screen.getByText(latestProducts.products[1].name)).toBeInTheDocument();

  expect(screen.getByText(latestProducts.products[2].name)).toBeInTheDocument();

  expect(screen.getByText(latestProducts.products[3].name)).toBeInTheDocument();
});
