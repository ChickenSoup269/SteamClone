const GameService = require('../services/gameServices');

class gameController {
  // Create
  static async createGame(req, res) {
    try {
      const gameData = req.body;
      const game = await GameService.createGame(gameData);
      res.status(201).json(game);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Get all games
  static async getAllGames(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const games = await GameService.getAllGames(parseInt(page), parseInt(limit));
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get game by ID
  static async getGameById(req, res) {
    try {
      const { gameId } = req.params;
      const game = await GameService.getGameById(gameId);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //Search games
  static async searchGames(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
      }
      const games = await GameService.searchGames(query);
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update
  static async updateGame(req, res) {
    try {
      const { gameId } = req.params;
      const updateData = req.body;
      const game = await GameService.updateGame(gameId, updateData);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json(game);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Delete
  static async deleteGame(req, res) {
    try {
      const { gameId } = req.params;
      const deleted = await GameService.deleteGame(gameId);
      if (!deleted) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json({ message: 'Game deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = gameController;