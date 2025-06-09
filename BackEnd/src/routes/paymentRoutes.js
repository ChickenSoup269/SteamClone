const express = require('express');
const router = express.Router();
const { createPayment, capturePayment, cancelPayment } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, createPayment);
router.get('/success', capturePayment);
router.get('/cancel', cancelPayment);

module.exports = router;