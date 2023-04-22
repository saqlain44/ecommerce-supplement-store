import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import UserProfileForm from '../features/user/UserProfileForm';

const ProfilePage = () => {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <Row>
      <Col md={3}>
        <h4>USER PROFILE</h4>
        <UserProfileForm />
      </Col>

      <Col md={9}>
        {/* TODO: MYORDERS */}
        <h4>MY ORDERS</h4>
      </Col>
    </Row>
  );
};

export default ProfilePage;
