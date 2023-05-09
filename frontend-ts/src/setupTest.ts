import '@testing-library/jest-dom/extend-expect';
import fetch from 'cross-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import * as latestProducts from './features/product/__tests__/data/latestProducts.json';
import * as trendingProtein from './features/product/__tests__/data/trendingProtein.json';
import * as trendingBcaa from './features/product/__tests__/data/trendingBcaa.json';
import * as products from './features/cart/__tests__/data/products.json';


const server = setupServer(
  rest.get('/api/products/latest', (_req, res, ctx) => {
    return res(ctx.json(latestProducts));
  }),

  rest.get('/api/products/trending', (req, res, ctx) => {
    const category = req.url.searchParams.get('category');
    if (category === 'protein'){
      return res(ctx.json(trendingProtein));
    }
    if (category === 'bcaa'){
      return res(ctx.json(trendingBcaa));
    }
    return res(ctx.json({}));
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const productId = req.params.id;
    const product = products.products.filter(p => p._id === productId);
    if (product.length) {
      return res(ctx.json(product[0]));
    }
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.fetch = fetch;
// eslint-disable-next-line
//@ts-ignore
global.Request = fetch.Request;
