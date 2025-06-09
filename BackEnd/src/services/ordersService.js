const Order = require('../models/bookingModel');
const Game = require('../models/gameModel');
const User = require('../models/UserModel');
const UserGames = require('../models/usergamesModel');

class OrderService {
  static async createOrder(userId, gameId, transactionType) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    // const existingGame = await UserGames.findOne({ userId, gameId, transactionType: 'buy' });
    // if (existingGame) {
    //   throw new Error('User already owns this game');
    // }

    if (!game.option || !game.option[0]) {
      throw new Error('Game price not available');
    }

    const priceField = transactionType === 'buy' ? 'priceDiscounted' : 'rentalPrice';
    if (!game.option[0][priceField]) {
      throw new Error(`${transactionType === 'buy' ? 'Purchase' : 'Rental'} price not available`);
    }

    const priceInVND = game.option[0][priceField]; // 18800000 (buy) hoặc 9400000 (rent)
    const exchangeRate = 24000; // 1 USD = 24,000 VND
    const priceInUSD = priceInVND / 100 / exchangeRate; // Giả định cent, chia 100

    const order = new Order({
      userId,
      gameId,
      amount: parseFloat(priceInUSD.toFixed(2)),
      currency: 'USD',
      status: 'created',
      transactionType,
      rentalDuration: transactionType === 'rent' ? 7 : null, // Thuê 7 ngày
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

    if (status === 'completed') {
      const existingGame = await UserGames.findOne({ userId: order.userId, gameId: order.gameId, transactionType: 'buy' });
      if (!existingGame) {
        const userGame = {
          userId: order.userId,
          gameId: order.gameId,
          transactionType: order.transactionType,
        };
        if (order.transactionType === 'rent') {
          userGame.rentalExpiresAt = new Date(Date.now() + order.rentalDuration * 24 * 60 * 60 * 1000); // 7 ngày
        }
        await UserGames.create(userGame);
      }
    } else if (status === 'failed') {
      await UserGames.deleteOne({ userId: order.userId, gameId: order.gameId, transactionType: order.transactionType });
    }

    return order;
  }

  static async getAllOrders(page = 1, limit = 10) {
    const orders = await Order.find()
      .populate({
        path: 'gameId',
        model: 'Game',
        select: 'game_id game_name',
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    return orders;
  }

  static async getUserOrders(userId, page = 1, limit = 10) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const orders = await Order.find({ userId })
      .populate({
        path: 'gameId',
        model: 'Game',
        select: 'game_id game_name',
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    return orders;
  }
}

module.exports = OrderService;