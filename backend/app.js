const express = require('express');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

module.exports = () => {
  const app = express();

  // Body parser
  app.use(express.json());

  // Run morgan logger in dev mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.get('/', (req, res) => res.send('API is running'));

  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
