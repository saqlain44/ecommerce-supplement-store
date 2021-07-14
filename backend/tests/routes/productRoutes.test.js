const request = require('supertest');
const app = require('../../app');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');
const Context = require('../context');

let context;

beforeAll(async () => {
  context = await Context.connect();
});

beforeEach(async () => {
  await context.seed();
});

afterAll(() => {
  return context.close();
});

it('can get all the products', async () => {
  const { body } = await request(app()).get('/api/products');
  // Expect 6 products
  expect(body.length).toEqual(6);
});

it('can get product by id', async () => {
  const { body } = await request(app()).get('/api/products');
  const id = body[0]._id;

  await request(app()).get(`/api/products/${id}`).expect(200);
});
