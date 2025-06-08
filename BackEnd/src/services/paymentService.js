const { paypal, client } = require('../config/paypal');
const Order = require('../models/bookingModel');
const Payment = require('../models/paymentModel');
const Game = require('../models/gameModel');
const UserGames = require('../models/usergamesModel');
const OrderService = require('./ordersService');

class PaymentService {
 static async createPayment(orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const game = await Game.findOne({ game_id: order.gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    if (!game.option || !game.option[0] || !game.option[0].priceDiscounted) {
      throw new Error('Game price not available');
    }
    const priceInVND = game.option[0].priceDiscounted;
    const exchangeRate = 24000; // 1 USD = 24,000 VND
    const priceInUSD = priceInVND / exchangeRate;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: priceInUSD.toFixed(2),
          },
          description: `Purchase ${game.game_name} (Game ID: ${order.gameId})`,
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
        return_url: `http://localhost:3001/api/payment/success?orderId=${order._id}`,
        cancel_url: `http://localhost:3001/api/payment/cancel?orderId=${order._id}`,
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
        await UserGames.create({ userId: order.userId, gameId: order.gameId });
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