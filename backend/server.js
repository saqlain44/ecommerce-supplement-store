const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

connectDB();

const app = express();

// Run morgan logger in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('API is running'));

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
