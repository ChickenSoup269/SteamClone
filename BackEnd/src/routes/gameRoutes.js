const express = require('express');
const router = express.Router();
const { getGames,getGamesOnSaleController } = require('../controller/gameController');
// route detail
router.get('/', getGames);
router.get('/gameOnsale', getGamesOnSaleController);
//[POST]

router.get('/detail/:id');
// export
module.exports = router;
