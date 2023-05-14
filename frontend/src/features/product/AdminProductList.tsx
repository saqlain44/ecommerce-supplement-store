import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';

import {
  useFetchProductListQuery,
  useDeleteProductMutation,
} from './productApiSlice';

const AdminProductList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || '1';

  const { isLoading, isError, error, data, refetch } = useFetchProductListQuery(
    {
      page: parseInt(pageNumber),
    }
  );

  const [
    deleteProduct,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
    },
  ] = useDeleteProductMutation();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (user && !user.isAdmin) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    if (dataDelete) {
      refetch();
    }
  }, [dataDelete]);

  const deleteHandler = (productId: string) => {
    if (window.confirm('Are you sure')) {
      deleteProduct(productId);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {isLoadingDelete && <Loader />}
      {isErrorDelete && <ErrorMessage error={errorDelete} />}
      {dataDelete && (
        <Message variant="success">Product deleted successfully.</Message>
      )}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>BRAND</th>
            <th>CATEGORY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>
                <LinkContainer
                  to={`/admin/product/${product._id}/edit`}
                  data-cy={`btn-${product.name.replace(/\s+/g, '')}-edit`}
                >
                  <Button variant="secondary" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                &nbsp;&nbsp;
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product._id)}
                  data-cy={`btn-${product.name.replace(/\s+/g, '')}-delete`}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        pages={data?.pages}
        page={data?.page}
        isAdmin={true}
        keyword={''}
      />
    </>
  );
};

export default AdminProductList;
