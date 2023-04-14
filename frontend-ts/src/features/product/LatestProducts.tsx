import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useFetchProductLatestListQuery } from './productApiSlice';

const LatestProducts = () => {
  const { data, error, isLoading, isError } = useFetchProductLatestListQuery();
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    <ErrorMessage error={error} />;
  }

  return (
    <>
      <Row>
        {data &&
          data.products.map((product) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              key={product._id}
              data-cy="latest-products"
            >
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default LatestProducts;
