import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useFetchProductTrendingListQuery } from './productApiSlice';

type Props = {
  category: 'bcaa' | 'protein';
};

const TrendingProducts = ({ category }: Props) => {
  const { isLoading, isError, error, data } =
    useFetchProductTrendingListQuery(category);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Row className="p-2 my-3">
      <Col>
        <Row xs="auto">
          <Col>
            <h5 className="fw-bold">
              <i className="fas fa-poll"></i>
              &nbsp; TRENDING IN {`${category.toUpperCase()}`}{' '}
            </h5>
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
                data-cy={`trending-${category}`}
              >
                <Product product={product} />
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default TrendingProducts;
