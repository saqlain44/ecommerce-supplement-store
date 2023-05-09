import React from 'react';
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock component and screens
vi.mock('../components/Header', () => ({
  default: () => <div>Header</div>,
}));
vi.mock('../components/Footer', () => ({
  default: () => <div>Footer</div>,
}));
vi.mock('../pages/HomePage', () => ({
  default: () => <div>HomePage</div>,
}));

test('footer', () => {
  render(
    <App />
  );
  expect(screen.getByText(/Footer/)).toBeDefined();
  expect(screen.getByText(/Header/)).toBeDefined();
  expect(screen.getByText(/HomePage/)).toBeDefined();
});
