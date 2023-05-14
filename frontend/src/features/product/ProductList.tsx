import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useFetchProductListQuery } from './productApiSlice';
import Product from '../../components/Product';
import Paginate from '../../components/Paginate';

const ProductList = () => {
  const location = useLocation();
  const params = useParams();

  const page = parseInt(params.pageNumber || '1');
  const keyword = params.keyword || '';
  const category = params.collection || '';

  const { isLoading, isError, error, data } = useFetchProductListQuery({
    keyword,
    page,
    category,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Row>
        {data?.products.map((product) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={product._id}
            data-cy="product-all"
          >
            <Product product={product} redirect={location.pathname} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data?.pages} page={data?.page} keyword={keyword} />
    </>
  );
};

export default ProductList;
