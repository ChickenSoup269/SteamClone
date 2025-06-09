const Review = require('../models/reviewsModel');
const Game = require('../models/gameModel');
const User = require('../models/UserModel');

class ReviewService {
  static async createReview(userId, { gameId, rating, comment }) {
    const game = await Game.findOne({ game_id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    const review = new Review({
      userId,
      gameId,
      rating,
      comment,
    });

    await review.save();
    return review;
  }

static async getGameReviews(gameId) {
  const game = await Game.findOne({ game_id: gameId });
  if (!game) {
    throw new Error('Game not found');
  }
  const reviews = await Review.find({ gameId }).lean();
  const userIds = [...new Set(reviews.map(review => review.userId))];
  const users = await User.find({ userId: { $in: userIds } }).select('userId username').lean();
  const userMap = new Map(users.map(user => [user.userId, user.username]));
  return reviews.map(review => ({
    ...review,
    username: userMap.get(review.userId) || 'Unknown User',
  }));
}

  static async updateReview(reviewId, userId, userRole, { rating, comment }) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    if (review.userId !== userId && userRole !== 'admin') {
      throw new Error('Unauthorized to update this review');
    }
    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment; 
    review.updatedAt = new Date();

    await review.save();
    return review;
  }

  static async deleteReview(reviewId, userId, userRole) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    if (review.userId !== userId && userRole !== 'admin') {
      throw new Error('Unauthorized to delete this review');
    }

    await Review.deleteOne({ _id: reviewId });
  }
}

module.exports = ReviewService;