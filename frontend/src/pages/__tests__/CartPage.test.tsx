import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartPage from '../CartPage';
import TestAppWrapper from '../../services/TestAppWrapper';

// Mock component and screens
vi.mock('../../features/cart/CartProductList', () => ({
  default: () => <div>CartProductList</div>,
}));
vi.mock('../../components/CartSubtotal', () => ({
  default: () => <div>CartSubtotal</div>,
}));

test('check the components are presents in the page', () => {
  render(
    <TestAppWrapper>
      <CartPage />
    </TestAppWrapper>
  );
  expect(screen.getByText(/CartProductList/)).toBeDefined();
  expect(screen.getByText(/CartSubtotal/)).toBeDefined();
});
