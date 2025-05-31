const Game = require("../models/gameModel")
const Genre = require("../models/genresModel") 
class gameServices{
   static async createGame(gameData) {
    // Kiểm tra genre_ids tồn tại
    if (gameData.genre_ids && gameData.genre_ids.length > 0) {
      const genres = await Genre.find({ genre_id: { $in: gameData.genre_ids } });
      if (genres.length !== gameData.genre_ids.length) {
        throw new Error('One or more genre_ids are invalid');
      }
    }
    if (!gameData.game_id) {
      throw new Error('game_id is required');
    }
    const game = new Game(gameData);
    return await game.save();
  }
  static async getAllGames(page, limit) {
    return await Game.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  static async getGameById(gameId) {
    return await Game.findOne({ game_id: parseInt(gameId) }).lean();
  }

  static async searchGames(query) {
    return await Game.find({
      $text: { $search: query },
    })
      .limit(20)
      .lean();
  }

  static async updateGame(gameId, updateData) {
    if (updateData.genre_ids && updateData.genre_ids.length > 0) {
      const genres = await Genre.find({ genre_id: { $in: updateData.genre_ids } });
      if (genres.length !== updateData.genre_ids.length) {
        throw new Error('One or more genre_ids are invalid');
      }
    }
    delete updateData.game_id;

    const game = await Game.findOneAndUpdate(
      { game_id: parseInt(gameId) },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!game) {
      return null;
    }

    return game;
  }

  static async deleteGame(gameId) {
    const result = await Game.deleteOne({ game_id: parseInt(gameId) });
    return result.deletedCount > 0;
  }
}
module.exports = gameServices;