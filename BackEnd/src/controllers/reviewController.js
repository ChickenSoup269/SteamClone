const ReviewService = require('../services/reviewService');
const { body, validationResult } = require('express-validator');

class ReviewController {
  static createReviewValidation = [
    body('gameId').isNumeric().withMessage('Invalid game ID'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().trim().withMessage('Invalid comment'),
  ];

  static updateReviewValidation = [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().trim().withMessage('Invalid comment'),
  ];

  static async createReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const review = await ReviewService.createReview(req.user.userId, req.body);
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getGameReviews(req, res) {
    try {
      const reviews = await ReviewService.getGameReviews(req.params.gameId);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const review = await ReviewService.updateReview(
        req.params.reviewId,
        req.user.userId,
        req.user.role,
        req.body
      );
      res.status(200).json(review);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      await ReviewService.deleteReview(req.params.reviewId, req.user.userId, req.user.role);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = ReviewController;