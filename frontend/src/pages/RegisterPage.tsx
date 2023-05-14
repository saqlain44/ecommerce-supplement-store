import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Loader from '../components/Loader';
import Meta from '../components/Meta';
import UserRegisterForm from '../features/user/UserRegisterForm';

import { useAppSelector } from '../app/hooks';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let redirect = searchParams.get('redirect') || '';
  if (!redirect.startsWith('/')) {
    redirect = '/' + redirect;
  }

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
      <Meta title="Nutrition-Strat Register" />
      <UserRegisterForm redirect={redirect} />
    </>
  );
};

export default RegisterPage;
