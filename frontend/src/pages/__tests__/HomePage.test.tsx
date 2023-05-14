import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';
import TestAppWrapper from '../../services/TestAppWrapper';

// Mock component and screens
vi.mock('../../features/product/LatestProducts', () => ({
  default: () => <div>LatestProducts</div>,
}));
vi.mock('../../features/product/ProductCarousel', () => ({
  default: () => <div>ProductCarousel</div>,
}));
vi.mock('../../features/product/TrendingProducts', () => ({
  default: () => <div>TrendingProducts</div>,
}));

test('check the components are presents in the page', () => {
  render(
    <TestAppWrapper>
      <HomePage />
    </TestAppWrapper>
  );
  expect(screen.getByText(/LatestProducts/)).toBeDefined();
  expect(screen.getByText(/ProductCarousel/)).toBeDefined();
  expect(screen.getAllByText('TrendingProducts')).toBeDefined();
  // check two trending products (proteins and bcaas)
  expect(screen.getAllByText('TrendingProducts').length).eq(2);
  expect(screen.getAllByText('BUY AUTHENTIC')).toBeDefined();
});

