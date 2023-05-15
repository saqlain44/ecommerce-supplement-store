import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestAppWrapper from '../../../services/TestAppWrapper';
import UserProfileForm from '../UserProfileForm';
import { store } from '../../../app/store';
import userData from './data/user';

test('show current user details in the form', async () => {
  render(
    <TestAppWrapper>
      <UserProfileForm />
    </TestAppWrapper>
  );

  await waitFor(() => new Promise((r) => setTimeout(r, 50)));
  await waitFor(() => screen.getAllByDisplayValue(userData.name));

  expect(screen.getByDisplayValue(userData.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();
});

test('update current user details in the form', async () => {
  render(
    <TestAppWrapper>
      <UserProfileForm />
    </TestAppWrapper>
  );

  await waitFor(() => screen.getByDisplayValue(userData.name));

  const nameField = screen.getByTestId('user-profile-name');
  const emailField = screen.getByTestId('user-profile-email');
  const submitBtn = screen.getByTestId('submit-btn');

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  expect(screen.getByDisplayValue(userData.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();

  await userEvent.clear(nameField);
  await userEvent.clear(emailField);
  await userEvent.type(nameField, 'foo');
  await userEvent.type(emailField, 'foo@bar.com');

  expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
  expect(screen.getByDisplayValue('foo@bar.com')).toBeInTheDocument();

  fireEvent.submit(screen.getByTestId('profile-form'));

  await waitFor(() => new Promise((r) => setTimeout(r, 50)));
  await waitFor(() => screen.getByText('User profile updated successfully.'));
  await waitFor(() => store.getState().auth.user?.email);
  const user = store.getState().auth.user;

  expect(user?.name).eq('foo');
  expect(user?.email).eq('foo@bar.com');
});
