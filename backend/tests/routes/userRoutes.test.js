const request = require('supertest');
const app = require('../../app');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');
const Context = require('../context');

let context;
let user;

beforeAll(async () => {
  context = await Context.connect();
});

beforeEach(async () => {
  await context.seed();
  process.env.JWT_SECRET = 'abc1234';
  user = {
    name: 'Test User',
    email: 'test@test.com',
    password: '123456',
  };
});

afterAll(() => {
  return context.close();
});

it('can create a user', async () => {
  const startingCount = await User.countDocuments();

  await request(app()).post('/api/users').send(user).expect(201);

  const finishCount = await User.countDocuments();
  expect(finishCount - startingCount).toEqual(1);
});

it('check a user', async () => {
  const {
    body: { _id, token },
  } = await request(app()).post('/api/users').send(user);

  const {
    body: { email },
  } = await request(app())
    .get(`/api/users/profile`)
    .set('Authorization', 'Bearer ' + token);
  expect(email).toEqual(user.email);
});

it('login a user', async () => {
  await request(app()).post('/api/users').send(user).expect(201);

  const {
    body: { email },
  } = await request(app())
    .post(`/api/users/login`)
    .send({ email: user.email, password: user.password });
  expect(email).toEqual(user.email);
});
