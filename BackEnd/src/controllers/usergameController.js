const UserGamesService = require('../services/usergameService');

const getUserGames = async (req, res) => {
  try {
    const { userId } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const userGames = await UserGamesService.getUserGames(userId, parseInt(page), parseInt(limit));
    res.json({ userGames });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkGameOwnership = async (req, res) => {
  try {
    const { userId } = req.user;
    const { gameId } = req.params;
    const ownsGame = await UserGamesService.checkGameOwnership(userId, parseInt(gameId));
    res.json({ ownsGame });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeGameOwnership = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const { userId, gameId } = req.params;
    const userGame = await UserGamesService.removeGameOwnership(userId, parseInt(gameId));
    res.json({ message: 'Game ownership removed successfully', userGame });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserGames, checkGameOwnership, removeGameOwnership };