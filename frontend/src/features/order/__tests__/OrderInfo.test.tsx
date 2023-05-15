import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestAppWrapper from '../../../services/TestAppWrapper';
import OrderInfo from '../OrderInfo';
import { store } from '../../../app/store';
import {
  saveShippingAddress,
  savePaymentMethod,
  addItem,
} from '../../cart/cartSlice';

const shippingAddress = {
  city: 'oregon',
  address: '123 street',
  country: 'USA',
  postalCode: '123456',
};

const item = {
  qty: 1,
  name: 'foo',
  image: '/image/foo.png',
  price: 23.99,
  product: '123457',
  countInStock: 10,
};

test('show order info', () => {
  store.dispatch(saveShippingAddress(shippingAddress));

  store.dispatch(savePaymentMethod('paypal'));

  store.dispatch(addItem(item));

  render(
    <TestAppWrapper>
      <OrderInfo />
    </TestAppWrapper>
  );

  expect(screen.getByText('paypal')).toBeInTheDocument();
  expect(screen.getByText(/USA/)).toBeInTheDocument();
  expect(screen.getByText(/oregon/)).toBeInTheDocument();
  expect(screen.getByText(/23.99/)).toBeInTheDocument();
});
