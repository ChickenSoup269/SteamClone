const UserGames = require('../models/usergamesModel');
const User = require('../models/UserModel');
const Game = require('../models/gameModel');

class UserGamesService {
  static async getUserGames(userId, page = 1, limit = 10) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const userGames = await UserGames.find({ userId })
      .populate({
        path: 'gameId',
        model: 'Game',
        select: 'game_id title price description',
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return userGames;
  }

  static async checkGameOwnership(userId, gameId) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    const userGame = await UserGames.findOne({ userId, gameId }).lean();
    return !!userGame;
  }

  static async removeGameOwnership(userId, gameId) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }

    const userGame = await UserGames.findOneAndDelete({ userId, gameId });
    if (!userGame) {
      throw new Error('User does not own this game');
    }

    return userGame;
  }
}

module.exports = UserGamesService;