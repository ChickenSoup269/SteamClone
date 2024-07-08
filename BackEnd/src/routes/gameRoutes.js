const express = require('express');
const router = express.Router();
const { getGames, getGamesOnSaleController ,searchGamesController ,getGameDetailsController
  , insertGameController, deleteGamesController, updateGamesController} = require('../controller/gameController');
// route detail
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
router.get('/detail/:game_id/:game_slug', getGameDetailsController);
// export
router.get('/', getGames);
module.exports = router;
