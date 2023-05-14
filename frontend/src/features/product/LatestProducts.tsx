import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useFetchProductLatestListQuery } from './productApiSlice';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
  const { data, error, isLoading, isError } = useFetchProductLatestListQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Row className='p-2 my-3'>
        <Col>
          <Row xs='auto'>
            <Col>
              <h5
                className='fw-bold'
                style={{ position: 'relative', top: '7px' }}
              >
                <i className='fas fa-bolt'></i>
                &nbsp; LATEST PRODUCTS
              </h5>
            </Col>
            <Col>
              <Link
                to='/products'
                className='btn btn-success'
                data-cy='view-all'
              >
                View All
              </Link>
            </Col>
          </Row>
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
        </Col>
      </Row>
    </>
  );
};

export default LatestProducts;
