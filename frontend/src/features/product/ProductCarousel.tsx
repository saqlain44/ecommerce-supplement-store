import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useFetchProductTopListQuery } from './productApiSlice';

const ProductCarousel = () => {
  const [index, setIndex] = useState(0);

  const { isLoading, isError, error, data } = useFetchProductTopListQuery();

  const handleSelect = (selectedIndex: number, e: unknown) => {
    setIndex(selectedIndex);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Carousel
      pause="hover"
      className="carousel-bg"
      data-cy="carousel"
      activeIndex={index}
      onSelect={handleSelect}
    >
      {data &&
        data.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <div className="d-flex justify-content-center">
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h3>
                    {product.name} (${product.price})
                  </h3>
                </Carousel.Caption>
              </div>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
