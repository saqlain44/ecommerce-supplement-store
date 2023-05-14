import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserLoginForm from '../UserLoginForm';
import TestAppWrapper from '../../../services/TestAppWrapper';
import { store } from '../../../app/store';

test('user login form test', async () => {
  render(
    <TestAppWrapper>
      <UserLoginForm />
    </TestAppWrapper>
  );

  expect(screen.getByRole('textbox', { name: /Email/ })).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();

  const emailField = screen.getByTestId('user-login-email');
  const passwordField = screen.getByTestId('user-login-password');
  const submitBtn = screen.getByTestId('submit-btn');

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();

  await userEvent.type(emailField, 'foo@bar.com');
  await userEvent.type(passwordField, '123456');
  await userEvent.click(submitBtn);

  expect(screen.getByDisplayValue('foo@bar.com')).toBeInTheDocument();
  expect(screen.getByDisplayValue('123456')).toBeInTheDocument();

  await waitFor(() => store.getState().auth.user);

  const user = store.getState().auth.user;

  expect(user?.email).eq('foo@bar.com');

  // screen.debug();
});
