const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const url = process.env.URL || 'http://localhost';

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Default route
app.get('/', (req, res) => res.status(200).send('Hello world'));

app.listen(port, () => console.log(`App is listening at ${url}:${port}`));
