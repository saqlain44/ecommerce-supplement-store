import React from 'react';
import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestAppWrapper from '../../../services/TestAppWrapper';
import UserEditForm from '../UserEditForm';
import * as userData from './data/user.json';

// mock react router useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as Record<string, never>,
    useParams: () => ({id: '1234'}),
  };
});

test('edit an user', async () => {
  render(
    <TestAppWrapper>
      <UserEditForm />
    </TestAppWrapper>
  );

  await waitFor(() => screen.getByDisplayValue(userData.name));

  const nameField = screen.getByTestId('name');
  const emailField = screen.getByTestId('email');
  const isAdminCheck = screen.getByTestId('is-admin');
  const submitForm = screen.getByTestId('form');

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(isAdminCheck).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();

  await userEvent.clear(nameField);
  await userEvent.clear(emailField);

  await userEvent.type(nameField, 'foo');
  await userEvent.type(emailField, 'foo@bar.com');

  expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
  expect(screen.getByDisplayValue('foo@bar.com')).toBeInTheDocument();

  fireEvent.submit(submitForm);

  await waitFor(() => screen.getByText('User updated successfully.'));

  expect(screen.getByText('User updated successfully.')).toBeInTheDocument();

  // screen.debug();
});
