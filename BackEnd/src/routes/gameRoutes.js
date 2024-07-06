const express = require('express');
const router = express.Router();
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
router.get('/detail/:id');
// export
router.get('/', getGames);
module.exports = router;
