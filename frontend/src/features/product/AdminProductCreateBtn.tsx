import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

import { useCreateProductMutation } from './productApiSlice';

const AdminProductCreateBtn = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading, isError, error, data }] =
    useCreateProductMutation();

  useEffect(() => {
    if (data) {
      navigate(`/admin/product/${data._id}/edit`);
    }
  }, [data]);

  const createProductHandler = () => {
    createProduct();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Button
      className="my-3"
      onClick={createProductHandler}
      data-cy="btn-create-product"
      disabled={isLoading}
    >
      <i className="fas fa-plus"></i>&nbsp;Create Product
    </Button>
  );
};

export default AdminProductCreateBtn;
