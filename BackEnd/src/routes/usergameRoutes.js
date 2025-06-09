const express = require('express');
const router = express.Router();
const { getUserGames, checkGameOwnership, removeGameOwnership } = require('../controllers/usergameController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getUserGames);
router.get('/:gameId', authenticateToken, checkGameOwnership);
router.delete('/:userId/:gameId', authenticateToken, removeGameOwnership);

module.exports = router;