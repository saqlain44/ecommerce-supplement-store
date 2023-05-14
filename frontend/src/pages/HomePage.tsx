import React from 'react';

import Meta from '../components/Meta';
import LatestProducts from '../features/product/LatestProducts';
import ProductCarousel from '../features/product/ProductCarousel';
import TrendingProducts from '../features/product/TrendingProducts';

import Authenticity from '../components/Authenticity';

const HomePage = () => {
  return (
    <div>
      <Meta />
      <ProductCarousel />
      <LatestProducts />
      <Authenticity />
      <TrendingProducts category="protein" />
      <TrendingProducts category="bcaa" />
    </div>
  );
};

export default HomePage;
