import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TestAppWrapper from '../../services/TestAppWrapper';
import CartSubtotal from '../CartSubtotal';
import { CartItem } from '../../features/cart/cartSlice';

const cartItems: CartItem[] = [
  {
    name: 'foo',
    countInStock: 3,
    product: '123qwer',
    price: 12,
    image: '/images/foo.png',
    qty: 1,
  },
  {
    name: 'bar',
    countInStock: 4,
    product: '123qwerdfs',
    price: 22,
    image: '/images/bar.png',
    qty: 1,
  },
];

test('cart subtotal amount shows', () => {
  render(
    <TestAppWrapper>
      <CartSubtotal cartItems={cartItems} />
    </TestAppWrapper>
  );

  expect(screen.getByText('Subtotal (34.00)')).toBeInTheDocument();
  expect(screen.getAllByRole('button')).toBeTruthy();
});
