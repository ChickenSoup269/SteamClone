const mongoose = require('mongoose');

const userGamesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: { type: Number, required: true },
  transactionType: {
    type: String,
    enum: ['buy', 'rent'],
    required: true,
  },
  rentalExpiresAt: {
    type: Date, // Thời điểm hết hạn thuê (nếu transactionType là rent)
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserGames', userGamesSchema);