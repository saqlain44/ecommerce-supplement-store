import '@testing-library/jest-dom/extend-expect';
import fetch from 'cross-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import latestProducts from './features/product/__tests__/data/latestProducts';
import trendingProtein from './features/product/__tests__/data/trendingProtein';
import trendingBcaa from './features/product/__tests__/data/trendingBcaa';
import products from './features/cart/__tests__/data/products';
import userData from './features/user/__tests__/data/user';
import userList from './features/user/__tests__/data/users';
import myorders from './features/order/__tests__/data/myorders';
import orderList from './features/order/__tests__/data/orderlist';

const testUser = {
  _id: '6437c0ada5f5312d5ab69356',
  name: 'John Doe',
  email: 'john@example.com',
  isAdmin: false,
  token: 'token1234',
};

let users = userList;

const server = setupServer(
  // products
  rest.get('/api/products/latest', (_req, res, ctx) => {
    return res(ctx.json(latestProducts));
  }),

  rest.get('/api/products/trending', (req, res, ctx) => {
    const category = req.url.searchParams.get('category');
    if (category === 'protein') {
      return res(ctx.json(trendingProtein));
    }
    if (category === 'bcaa') {
      return res(ctx.json(trendingBcaa));
    }
    return res(ctx.json({}));
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const productId = req.params.id;
    const product = products.products.filter((p) => p._id === productId);
    if (product.length) {
      return res(ctx.json(product[0]));
    }
    return res(ctx.json({}));
  }),

  // users
  rest.post('api/users/login', async (req, res, ctx) => { 
    const body = await req.json();
    return res(ctx.json({
      ...testUser,
      email: body.email,
    }));
  }),

  rest.get('api/users', async (_req, res, ctx) => { 
    return res(ctx.json(users));
  }),

  rest.post('api/users', async (req, res, ctx) => { 
    const body = await req.json();
    return res(ctx.json({
      ...testUser,
      email: body.email,
      name: body.name,
    }));
  }),

  rest.get('api/users/:id', async (_req, res, ctx) => { 
    return res(ctx.json(userData));
  }),

  rest.put('api/users/:id', async (req, res, ctx) => { 
    const body = await req.json();
    return res(ctx.json({
      ...userData,
      email: body.email,
      name: body.name,
      isAdmin: body.isAdmin,
    }));
  }),

  rest.delete('api/users/:id', async (req, res, ctx) => { 
    const filterdUsers = userList.filter(user => user._id !== req.params.id);
    users = filterdUsers;

    return res(ctx.json({}));
  }),

  rest.get('api/users/profile', async (_req, res, ctx) => { 
    return res(ctx.json(userData));
  }),

  rest.put('api/users/profile', async (req, res, ctx) => { 
    const body = await req.json();
    return res(ctx.json({
      ...userData,
      name: body.name,
      email: body.email,
    }));
  }),

  // orders
  rest.get('api/orders/myorders', async (_req, res, ctx) => { 
    return res(ctx.json(myorders));
  }),

  rest.get('api/orders', async (_req, res, ctx) => { 
    return res(ctx.json(orderList));
  }),

);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// setup cross-fetch for rtk fetch
global.fetch = fetch;
// eslint-disable-next-line
//@ts-ignore
global.Request = fetch.Request;

global.window.confirm = () => true;
