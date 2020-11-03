const express = require('express');
const statsController = require('./statsController');

const router = express.Router();

router.get('/', statsController);

module.exports = router;
