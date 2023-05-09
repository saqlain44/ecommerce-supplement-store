import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import TestAppWrapper from '../../../services/TestAppWrapper';
import TrendingProducts from '../TrendingProducts';
import * as trendingProtein from './data/trendingProtein.json';
import * as trendingBcaa from './data/trendingBcaa.json';

test('fetch and show trending proteins', async () => {
  render(
    <TestAppWrapper>
      <TrendingProducts category='protein' />
    </TestAppWrapper>
  );
  await waitFor(() => screen.findByText(trendingProtein.products[0].name));
  //screen.debug()
  //console.log(store.getState())
  expect(
    screen.getByText(trendingProtein.products[0].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingProtein.products[1].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingProtein.products[2].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingProtein.products[3].name)
  ).toBeInTheDocument();
});

test('fetch and show trending bcaa', async () => {
  render(
    <TestAppWrapper>
      <TrendingProducts category='bcaa' />
    </TestAppWrapper>
  );
  await waitFor(() => screen.findByText(trendingBcaa.products[0].name));
  //screen.debug()
  //console.log(store.getState())
  expect(
    screen.getByText(trendingBcaa.products[0].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingBcaa.products[1].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingBcaa.products[2].name)
  ).toBeInTheDocument();

  expect(
    screen.getByText(trendingBcaa.products[3].name)
  ).toBeInTheDocument();
});
