const express = require('express');
const GameController = require('../controllers/gameController');
const router = express.Router();
router.get('/', GameController.getAllGames);
router.post('/games', GameController.createGame);
router.get('/games/:gameId', GameController.getGameById);
router.get('/search', GameController.searchGames);
router.put('/games/:gameId', GameController.updateGame);
router.delete('/games/:gameId', GameController.deleteGame);

module.exports = router;
