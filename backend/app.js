const path = require('path');

const express = require('express');
const morgan = require('morgan');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes.js');

module.exports = () => {
  const app = express();

  // Body parser
  app.use(express.json());

  // Run morgan logger in dev mode
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/upload', uploadRoutes);

  app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
  );

  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Serve client page
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'frontend/build')));
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(process.cwd(), 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('API is running'));
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
