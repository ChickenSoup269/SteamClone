const express = require('express');
const router = express.Router();
const { authenticateToken} = require('../middleware/authMiddleware');
const ReviewController = require('../controllers/reviewController');

router.post('/', authenticateToken, ReviewController.createReview);
router.get('/:gameId', ReviewController.getGameReviews);
router.put('/reviews/:reviewId', authenticateToken, ReviewController.updateReview);
router.delete('/reviews/:reviewId', authenticateToken, ReviewController.deleteReview);
module.exports = router;