const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getGames,getGamesOnSaleController } = require('../controller/gameController');
const GameController = require('../controller/gameController')

router.get('/', getGames);
router.get('/gameOnsale', getGamesOnSaleController);
router.post('/create', GameController.createGame)
router.put('/update/:id', GameController.updateGame)

=======
const { getGames, getGamesOnSaleController
  , insertGameController,deleteGamesController,updateGamesController } = require('../controller/gameController');
// route detail
router.get('/gameOnsale', getGamesOnSaleController);
//[POST]
router.post('/insert', insertGameController);
//[Delete]
router.delete('/delete/:game_id', deleteGamesController);
//[Update]
router.put('/update/:game_id',updateGamesController)
// [Search]
>>>>>>> fb91cda30efabe8edf8b108bbaa56ed4f23db063
router.get('/detail/:id');
// export
router.get('/', getGames);
module.exports = router;
