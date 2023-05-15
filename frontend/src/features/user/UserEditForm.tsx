import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  useFetchUserByIdQuery,
  useUpdateUserByIdMutation,
} from './userApiSlice';

type Inputs = {
  name: string;
  email: string;
  isAdmin: boolean;
};

const UserEditForm = () => {
  const params = useParams();

  const userId = params.id || '';

  const { isLoading, isError, error, data } = useFetchUserByIdQuery(userId, {
    skip: !userId,
  });
  const [
    updateUserById,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      data: dataUpdate,
    },
  ] = useUpdateUserByIdMutation();

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      isAdmin: data?.isAdmin,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUserById({
      userId,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
    });
  };

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('isAdmin', data.isAdmin);
    }
  }, [data]);

  useEffect(() => {
    if (dataUpdate) {
      console.log('updated user data', dataUpdate);
    }
  }, [dataUpdate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            data-testid="name"
            {...register('name', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="py-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            data-testid="email"
            {...register('email', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="isadmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            data-testid="is-admin"
            {...register('isAdmin', { required: false })}
          ></Form.Check>
        </Form.Group>

        {isLoadingUpdate ? (
          <Loader />
        ) : (
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        )}
        {isErrorUpdate && <ErrorMessage error={errorUpdate} />}
      </Form>
      {dataUpdate && (
        <Message variant="success">User updated successfully.</Message>
      )}
    </>
  );
};

export default UserEditForm;
