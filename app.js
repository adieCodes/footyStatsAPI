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

module.exports = app;
