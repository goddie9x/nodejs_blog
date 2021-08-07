const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewController');

router.use('/:detail', newsController.detail);
router.use('/', newsController.index);

module.exports = router;
