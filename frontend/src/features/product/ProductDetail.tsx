import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

import { useFetchProductDetailQuery } from './productApiSlice';
import Rating from '../../components/Rating';
import AddToCart from '../../components/AddToCart';

const ProductDetail = () => {
  const params = useParams();

  const { isLoading, isError, error, data } = useFetchProductDetailQuery(
    params.id || ''
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Row>
      <Col md={6}>
        <Image
          src={data?.image}
          alt={data?.name}
          fluid
          className="product-image"
        />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h4>{data?.name}</h4>
          </ListGroup.Item>
          <ListGroup.Item>
            {data?.rating && (
              <Rating
                value={data?.rating}
                text={`${data?.numReviews} reviews`}
              />
            )}
          </ListGroup.Item>
          <ListGroup.Item>Price: ${data?.price}</ListGroup.Item>
          <ListGroup.Item>Description: {data?.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <AddToCart
          price={data?.price || 0}
          countInStock={data?.countInStock || 0}
        />
      </Col>
    </Row>
  );
};

export default ProductDetail;
