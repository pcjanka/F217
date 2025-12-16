const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const orderHistoryController = require('../controllers/orderHistoryController');

router.get('/buy', orderController.buyForm);
router.post('/buy', orderController.buy);

router.get('/orders', orderHistoryController.history);

module.exports = router;
