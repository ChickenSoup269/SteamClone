const OrderService = require('../services/ordersService');

const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { gameId, transactionType } = req.body;
    if (!gameId || !transactionType || !['buy', 'rent'].includes(transactionType)) {
      return res.status(400).json({ message: 'Invalid gameId or transactionType' });
    }
    const order = await OrderService.createOrder(userId, parseInt(gameId), transactionType);
    res.status(201).json({ orderId: order._id, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const { page = 1, limit = 10 } = req.query;
    const orders = await OrderService.getAllOrders(parseInt(page), parseInt(limit));
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const orders = await OrderService.getUserOrders(userId, parseInt(page), parseInt(limit));
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const { orderId } = req.params;
    const { status } = req.body;
    if (!['created', 'pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await OrderService.updateOrderStatus(orderId, status);
    res.json({ order, message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getUserOrders, updateOrderStatus };