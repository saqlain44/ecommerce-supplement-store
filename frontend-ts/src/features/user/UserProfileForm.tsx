import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import {
  useProfileUserQuery,
  useUpdateUserProfileMutation,
} from './userApiSlice';
import { setUser } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
};

const UserProfileForm = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useProfileUserQuery();

  const [
    updateUserProfile,
    {
      isLoading: isLoadingUpdateUser,
      isError: isErrorUpdateUser,
      data: dataUpdateUser,
      error: errorUpdateUser,
    },
  ] = useUpdateUserProfileMutation();

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUserProfile({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('email', data.email);
    }
  }, [data]);

  useEffect(() => {
    if (dataUpdateUser) {
      dispatch(setUser(dataUpdateUser));
    }
  }, [dataUpdateUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            data-cy="form-name"
            {...register('name', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="py-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            data-cy="form-email"
            {...register('email', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            {...register('password', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="py-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="btn-block"
          data-cy="btn-update"
          disabled={isLoadingUpdateUser}
        >
          Update
        </Button>
      </Form>
      {dataUpdateUser && (
        <div className='py-3'>
          <Message variant="success">
            {'User profile updated successfully.'}
          </Message>
        </div>
      )}
      {isErrorUpdateUser && errorUpdateUser && (
        <div className='py-3'>
          <ErrorMessage error={errorUpdateUser} />
        </div>
      )}
    </>
  );
};

export default UserProfileForm;
