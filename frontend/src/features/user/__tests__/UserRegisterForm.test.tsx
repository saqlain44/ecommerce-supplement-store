import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserRegisterForm from '../UserRegisterForm';
import TestAppWrapper from '../../../services/TestAppWrapper';
import { store } from '../../../app/store';

const userData = {
  name: 'foo',
  email: 'foo@bar.com',
  password: '123456'
};

test('resgister a user', async () => {

  render(
    <TestAppWrapper>
      <UserRegisterForm />
    </TestAppWrapper>
  );

  const nameField = screen.getByTestId('user-register-name');
  const emailField = screen.getByTestId('user-register-email');
  const passField = screen.getByTestId('user-register-password');
  const confirmPassField = screen.getByTestId('user-register-confirm-password');
  const submitBtn = screen.getByTestId('submit-btn');

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passField).toBeInTheDocument();
  expect(confirmPassField).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  await userEvent.type(nameField, userData.name);
  await userEvent.type(emailField, userData.email);
  await userEvent.type(passField, userData.password);
  await userEvent.type(confirmPassField, userData.password);

  expect(screen.getByDisplayValue(userData.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();
  expect(screen.getAllByDisplayValue(userData.password).length).eq(2);

  await userEvent.click(submitBtn);

  await waitFor(() => store.getState().auth.user);

  const user = store.getState().auth.user;

  expect(user?.email).eq(userData.email);
  expect(user?.name).eq(userData.name);

  // screen.debug();
});

test('can not resgister a user with invalid confirm password', async () => {

  render(
    <TestAppWrapper>
      <UserRegisterForm />
    </TestAppWrapper>
  );

  const nameField = screen.getByTestId('user-register-name');
  const emailField = screen.getByTestId('user-register-email');
  const passField = screen.getByTestId('user-register-password');
  const confirmPassField = screen.getByTestId('user-register-confirm-password');
  const submitBtn = screen.getByTestId('submit-btn');

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passField).toBeInTheDocument();
  expect(confirmPassField).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  await userEvent.type(nameField, userData.name);
  await userEvent.type(emailField, userData.email);
  await userEvent.type(passField, userData.password);
  await userEvent.type(confirmPassField, 'wrongpass');

  expect(screen.getByDisplayValue(userData.name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(userData.email)).toBeInTheDocument();

  await userEvent.click(submitBtn);
  expect(screen.getByText('Password does not match'));

  // screen.debug();
});
