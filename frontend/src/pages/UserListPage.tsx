import React from 'react';

import Meta from '../components/Meta';
import UserList from '../features/user/UserList';

const UserListPage = () => {
  return (
    <>
      <Meta title="Nutrition-Strat User-List" />
      <h2>Users</h2>
      <UserList />
    </>
  );
};

export default UserListPage;
