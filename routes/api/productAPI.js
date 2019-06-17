const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIcontroller');

router.get('/searchKeyword', productAPIController.searchList);

module.exports = router