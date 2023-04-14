import React from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import Meta from '../components/Meta';
import LatestProducts from '../features/product/LatestProducts';
import { useFetchProductListQuery } from '../features/product/productApiSlice';
import ProductCarousel from '../features/product/ProductCarousel';

const Home = () => {
  const dispatch = useAppDispatch();
  const { data } = useFetchProductListQuery();

  console.dir(data);
  return (
    <div>
      <Meta />
      <h1>Home</h1>
      <ProductCarousel />
      <LatestProducts />
    </div>
  );
};

export default Home;
