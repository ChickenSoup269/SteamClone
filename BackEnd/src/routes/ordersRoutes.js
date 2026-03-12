const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getUserOrders } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getAllOrders);
router.get('/user', authenticateToken, getUserOrders);

module.exports = router;