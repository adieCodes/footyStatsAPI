const express = require('express');
const statsController = require('./statsController');

const router = express.Router();

router.get('/:period', statsController);

module.exports = router;
