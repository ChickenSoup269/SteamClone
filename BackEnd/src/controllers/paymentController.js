const PaymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const { paypalOrderId, approvalUrl, orderId: returnedOrderId } = await PaymentService.createPayment(orderId);
    res.json({ paypalOrderId, approvalUrl, orderId: returnedOrderId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId, paypalOrderId } = req.query;
    const capture = await PaymentService.capturePayment(paypalOrderId, orderId);
    res.json({ message: 'Payment successful', capture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelPayment = async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await Order.findById(orderId);
    const payment = await Payment.findOne({ orderId });
    if (order) {
      order.status = 'failed';
      await order.save();
    }
    if (payment) {
      payment.status = 'FAILED';
      await payment.save();
    }
    res.json({ message: 'Payment canceled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment, capturePayment, cancelPayment };