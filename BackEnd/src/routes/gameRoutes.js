const express = require('express');
const router = express.Router();
const { getGames, getGamesOnSaleController ,searchGamesController ,getGameDetailsController
  , insertGameController, deleteGamesController, updateGamesController} = require('../controllers/gameController');
// Routes detail
//[GET]
router.get('/gameOnsale', getGamesOnSaleController);
//[POST]
router.post('/insert', insertGameController);
//[Delete]
router.delete('/delete/:game_id', deleteGamesController);
//[Update]
router.put('/update/:game_id',updateGamesController)
//[Search]
router.get('/search',searchGamesController)
//[Detail]
router.get('/detail/:game_id', getGameDetailsController);
// export
router.get('/getAllGames', getGames);
module.exports = router;
