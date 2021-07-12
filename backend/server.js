const dotenv = require('dotenv');
const colors = require('colors');

const app = require('./app');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const PORT = process.env.PORT;

app().listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
