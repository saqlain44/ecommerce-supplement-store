import React from 'react';
import {useLocation, useParams} from 'react-router-dom';

import Meta from '../components/Meta';
import LatestProducts from '../features/product/LatestProducts';
import ProductCarousel from '../features/product/ProductCarousel';
import TrendingProducts from '../features/product/TrendingProducts';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useFetchProductListQuery } from '../features/product/productApiSlice';
import ProductList from '../features/product/ProductList';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { data } = useFetchProductListQuery({});
  const location = useLocation();
  const params = useParams();
  const page = parseInt(params.pageNumber || '1');

  console.log('Location', location);
  console.log('Params', params);

  console.dir(data);
  return (
    <div>
      <Meta />
      <h1>Home</h1>
      <ProductCarousel />
      <h4>LatestProducts</h4>
      <LatestProducts />
      <h4>TrendingProtein</h4>
      <TrendingProducts category='protein' />
      <h4>TrendingBcaa</h4>
      <TrendingProducts category='bcaa' />
    </div>
  );
};

export default HomePage;
