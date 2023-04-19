import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Loader from '../components/Loader';
import Meta from '../components/Meta';
import UserLoginForm from '../features/user/UserLoginForm';

import { useAppSelector } from '../app/hooks';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = '/'.concat(searchParams.get('redirect') || '');

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user]);

  if (user) {
    return <Loader />;
  }

  return (
    <>
      <Meta title="Nutrition-Strat Login" />
      <UserLoginForm redirect={redirect} />
    </>
  );
};

export default LoginPage;
