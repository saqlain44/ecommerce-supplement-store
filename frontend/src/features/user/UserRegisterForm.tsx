import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAppDispatch } from '../../app/hooks';
import { useRegisterUserMutation } from './userApiSlice';
import { setUser } from '../../features/auth/authSlice';

type Props = {
  redirect?: string;
};

const UserRegisterForm = ({ redirect = '/' }: Props) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [registerUser, { isError, isLoading, error, data }] =
    useRegisterUserMutation();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password does not match');
    } else {
      registerUser({ name, email, password });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h4>Sign Up</h4>
          {message && <Message>{message}</Message>}
          {isError && <ErrorMessage error={error} />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                data-testid="user-register-name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="py-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                data-testid="user-register-email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                data-testid="user-register-password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="py-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                data-testid="user-register-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" data-testid="submit-btn">
              Register
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Have an Account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                &nbsp;Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegisterForm;
