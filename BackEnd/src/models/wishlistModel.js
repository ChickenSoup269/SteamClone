const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  gameId: { type: Number, required: true, ref: 'Game' },
  addedAt: { type: Date, default: Date.now },
});

wishlistSchema.index({ userId: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);