import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAppDispatch } from '../../app/hooks';
import { useFetchUserMutation } from './userApiSlice';
import { setUser } from '../../features/auth/authSlice';

type Props = {
  redirect?: string;
};

const UserLoginForm = ({ redirect = '/' }: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fetchUser, { isError, isLoading, error, data }] =
    useFetchUserMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUser({ email, password });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4 data-cy="sign-in">Sign In</h4>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                data-cy="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="py-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                data-cy="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                &nbsp;Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      {isError && <ErrorMessage error={error} />}
    </Container>
  );
};

export default UserLoginForm;
