import React from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestAppWrapper from '../../../services/TestAppWrapper';
import UserList from '../UserList';
import userList from './data/users';

test('show list of users', async () => {
  render(
    <TestAppWrapper>
      <UserList />
    </TestAppWrapper>
  );

  await waitFor(()=> screen.getByText(userList[0]._id));

  expect(screen.getByText(userList[0]._id)).toBeInTheDocument();

  // screen.debug();
});

test('can delete a user', async () => {
  render(
    <TestAppWrapper>
      <UserList />
    </TestAppWrapper>
  );

  await waitFor(()=> screen.getByText(userList[0]._id));

  const btnTestId = `btn-${userList[0]._id}-delete`;
  const deleteUserBtn = screen.getByTestId(btnTestId);
  expect(deleteUserBtn).toBeInTheDocument();


  await userEvent.click(deleteUserBtn);
  // sleep for 100ms
  await waitFor(() => new Promise((r) => setTimeout(r, 100)));

  expect(screen.queryByText(userList[0]._id)).toBeNull();
});

