const mongoose = require('mongoose');
const PaymentService = require('../services/paymentService');
const Order = require('../models/bookingModel');
const Payment = require('../models/paymentModel');

const createPayment = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { orderId } = req.body;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body is empty' });
    }
    if (!orderId) {
      return res.status(400).json({ message: 'orderId is required' });
    }
    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ message: `Invalid orderId: ${orderId}` });
    }
    const payment = await PaymentService.createPayment(orderId);
    res.json(payment);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: error.message });
  }
};


const capturePayment = async (req, res) => {
  try {
    console.log('Query params:', req.query);
    const { orderId, token } = req.query; // PayPal gửi token
    if (!orderId || !token) {
      return res.status(400).json({ message: 'orderId and token are required' });
    }
    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ message: `Invalid orderId: ${orderId}` });
    }
    const capture = await PaymentService.capturePayment(token, orderId);
    res.status(200).json({
      message: 'Payment successful',
      orderId,
      paypalOrderId: token,
      capture: {
        status: capture.status,
        captureId: capture.id,
      },
    });
  } catch (error) {
    console.error('Capture payment error:', error);
    res.status(500).json({
      message: 'Payment failed',
      error: error.message,
    });
  }
};

const cancelPayment = async (req, res) => {
  try {
    console.log('Cancel query params:', req.query);
    const { orderId } = req.query;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId is required' });
    }
    const order = await Order.findById(orderId);
    const payment = await Payment.findOne({ orderId });
    if (order) {
      order.status = 'failed';
      order.updatedAt = new Date();
      await order.save();
    }
    if (payment) {
      payment.status = 'FAILED';
      payment.updatedAt = new Date();
      await payment.save();
    }
    res.redirect('http://localhost:3000/payment/cancel'); // Thay bằng URL frontend
  } catch (error) {
    console.error('Cancel payment error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, capturePayment, cancelPayment };