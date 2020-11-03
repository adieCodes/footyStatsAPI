const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const statsRouter = require('./src/stats/statsRouter');

const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Default route
app.get('/', (req, res) => res.status(200).send('Hello world'));
app.use('/stats', statsRouter);
app.use((err, req, res, next) => {
  if (err.status === 400) return res.status(400).send(err);
  if (err.status === 404) return res.status(404).send(err);
  return next();
});

module.exports = app;
