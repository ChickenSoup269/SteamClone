const Order = require('../models/bookingModel');
const Game = require('../models/gameModel');
const User = require('../models/UserModel');
const UserGames = require('../models/usergamesModel');

class OrderService {
  static async createOrder(userId, gameId) {
     const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    const existingGame = await UserGames.findOne({ userId, gameId });
    if (existingGame) {
      throw new Error('User already owns this game');
    }

    if (!game.option || !game.option[0] || !game.option[0].priceDiscounted) {
      throw new Error('Game price not available');
    }
    const priceInVND = game.option[0].priceDiscounted;
    const exchangeRate = 24000;
    const priceInUSD = priceInVND / exchangeRate; 

    const order = new Order({
      userId,
      gameId,
      amount: parseFloat(priceInUSD.toFixed(2)), 
      currency: 'USD',
      status: 'created',
    });

    await order.save();
    return order;
  }

  static async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status;
    order.updatedAt = new Date();
    await order.save();
    return order;
  }

  static async getAllOrders() {
    const orders = await Order.find()
      .populate({
        path: 'gameId',
        model: 'Game',
        select: 'game_id title price',
      })
      .lean();
    return orders;
  }

  static async getUserOrders(userId) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const orders = await Order.find({ userId })
      .populate({
        path: 'gameId',
        model: 'Game',
        select: 'game_id title price',
      })
      .lean();
    return orders;
  }
}

module.exports = OrderService;