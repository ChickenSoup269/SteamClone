const express = require('express');
const router = express.Router();
const { getGames,getGamesOnSaleController } = require('../controller/gameController');
const GameController = require('../controller/gameController')

router.get('/', getGames);
router.get('/gameOnsale', getGamesOnSaleController);
router.post('/create', GameController.createGame)
router.put('/update/:id', GameController.updateGame)

router.get('/detail/:id');
// export
module.exports = router;
