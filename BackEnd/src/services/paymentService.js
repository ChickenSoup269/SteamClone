const { paypal, client } = require('../config/paypal');
const Order = require('../models/bookingModel');
const Payment = require('../models/paymentModel');
const mongoose = require('mongoose');
const Game = require('../models/gameModel');
const UserGames = require('../models/usergamesModel');
const OrderService = require('./ordersService');

class PaymentService {
  static async createPayment(orderId) {
    if (!mongoose.isValidObjectId(orderId)) {
      console.error('Invalid orderId:', orderId);
      throw new Error('Invalid orderId');
    }
    console.log('Received orderId:', orderId);
    const order = await Order.findById(orderId);
    if (!order) {
      console.error('Order not found for ID:', orderId);
      throw new Error('Order not found');
    }
    console.log('Found order:', order);
    const game = await Game.findOne({ game_id: order.gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    if (!game.option || !game.option[0]) {
      throw new Error('Game price not available');
    }

    const priceField = order.transactionType === 'buy' ? 'priceDiscounted' : 'rentalPrice';
    if (!game.option[0][priceField]) {
      throw new Error(`${order.transactionType === 'buy' ? 'Purchase' : 'Rental'} price not available`);
    }

    const priceInVND = game.option[0][priceField];
    const exchangeRate = 24000; 
    const priceInUSD = priceInVND / 100 / exchangeRate; 

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: priceInUSD.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: priceInUSD.toFixed(2),
              },
            },
          },
          description: `${order.transactionType === 'buy' ? 'Purchase' : 'Rental'} ${game.game_name} (Game ID: ${order.gameId})`,
          custom_id: order._id.toString(),
          items: [
            {
              name: game.game_name,
              unit_amount: {
                currency_code: 'USD',
                value: priceInUSD.toFixed(2),
              },
              quantity: '1',
            },
          ],
        },
      ],
      application_context: {
        return_url: `http://localhost:3001/payment/success?orderId=${order._id}`,
        cancel_url: `http://localhost:3001/payment/cancel?orderId=${order._id}`,
      },
    });

    try {
      const response = await client.execute(request);
      const paypalOrder = response.result;
      const approvalUrl = paypalOrder.links.find(link => link.rel === 'approve').href;

      const payment = new Payment({
        orderId: order._id,
        paypalOrderId: paypalOrder.id,
        status: 'CREATED',
        transactionType: order.transactionType,
      });
      await payment.save();

      await OrderService.updateOrderStatus(orderId, 'pending');
      return { paypalOrderId: paypalOrder.id, approvalUrl, orderId: order._id };
    } catch (error) {
      await OrderService.updateOrderStatus(orderId, 'failed');
      throw new Error(`Failed to create PayPal order: ${error.message}`);
    }
  }

  static async capturePayment(paypalOrderId, orderId) {
    if (!orderId) {
      console.error('orderId is undefined or null');
      throw new Error('orderId is required');
    }
    if (!mongoose.isValidObjectId(orderId)) {
      console.error('Invalid orderId:', orderId);
      throw new Error('Invalid orderId');
    }
    console.log('Capturing payment for orderId:', orderId, 'paypalOrderId:', paypalOrderId);
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    const payment = await Payment.findOne({ paypalOrderId });
    if (!payment) {
      throw new Error('Payment not found');
    }

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.prefer('return=representation');

    try {
      const response = await client.execute(request);
      const capture = response.result;

      payment.status = capture.status;
      payment.captureId = capture.id;
      payment.updatedAt = new Date();
      await payment.save();

      order.status = capture.status === 'COMPLETED' ? 'completed' : 'failed';
      order.updatedAt = new Date();
      await order.save();

      if (capture.status === 'COMPLETED') {
        await UserGames.create({
          userId: order.userId,
          gameId: order.gameId,
          transactionType: order.transactionType,
          rentalExpiresAt: order.transactionType === 'rent' ? new Date(Date.now() + order.rentalDuration * 24 * 60 * 60 * 1000) : null,
        });
      }

      return capture;
    } catch (error) {
      order.status = 'failed';
      payment.status = 'FAILED';
      await order.save();
      await payment.save();
      throw new Error(`Failed to capture PayPal order: ${error.message}`);
    }
  }
}

module.exports = PaymentService;