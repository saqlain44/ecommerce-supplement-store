import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import CartProductList from '../CartProductList';
import TestAppWrapper from '../../../services/TestAppWrapper';
import products from './data/products';

import { store } from '../../../app/store';
import { addItem } from '../cartSlice';

test('shows empty cart message if no items in the cart', () => {
  render(
    <TestAppWrapper>
      <CartProductList />
    </TestAppWrapper>
  );

  expect(screen.getByText(/Your Cart is Empty/)).toBeInTheDocument();
});

test('add product to cart with productId as props', async () => {
  const product = products.products[0];
  render(
    <TestAppWrapper>
      <CartProductList productId={product._id} />
    </TestAppWrapper>
  );

  await waitFor(() => new Promise((r) => setTimeout(r, 50)));
  await waitFor(() => screen.findByText(product.name));
});

test('add product to cart', () => {
  const product = products.products[0];

  store.dispatch(
    addItem({
      name: product.name,
      product: product._id,
      qty: 1,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    })
  );

  render(
    <TestAppWrapper>
      <CartProductList />
    </TestAppWrapper>
  );

  expect(screen.getByText(product.name)).toBeInTheDocument();
});
