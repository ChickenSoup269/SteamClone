const mongoose = require('mongoose');

const userGamesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserGames', userGamesSchema);