import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

import { useUserListQuery, useDeleteUserByIdMutation } from './userApiSlice';

const UserList = () => {
  const { isLoading, isError, error, data, refetch } = useUserListQuery();
  const [
    deleteUserById,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
    },
  ] = useDeleteUserByIdMutation();

  useEffect(() => {
    if (dataDelete) {
      refetch();
    }
  }, [dataDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      deleteUserById(id);
    }
  };

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user._id} data-cy="user-list">
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i
                    className="fas fa-check"
                    style={{ color: 'green' }}
                    data-cy="user-admin"
                  ></i>
                ) : (
                  <i
                    className="fas fa-times"
                    style={{ color: 'red' }}
                    data-cy="user-normal"
                  ></i>
                )}
              </td>
              <td>
                <LinkContainer
                  to={`/admin/user/${user._id}/edit`}
                  data-cy={`btn-${user.name.replace(/\s+/g, '')}-edit`}
                >
                  <Button variant="secondary" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                &nbsp;&nbsp;
                {!isLoadingDelete && (
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                    data-cy={`btn-${user.name.replace(/\s+/g, '')}-delete`}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isLoadingDelete && <Loader />}
      {isErrorDelete && <ErrorMessage error={errorDelete} />}
    </>
  );
};

export default UserList;
