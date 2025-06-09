const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  gameId: { type: Number, required: true, ref: 'Game' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

reviewSchema.index({ gameId: 1 });

module.exports = mongoose.model('Review', reviewSchema);

// reviewSchema.index({ userId: 1, gameId: 1 }, { unique: true });

