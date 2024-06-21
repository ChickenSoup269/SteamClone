const express = require('express');
const router = express.Router();
const { getGamesByGenresController ,getGenresController,insertGenreController} = require('../controller/genresController');
// route detail
//[GET]
router.get('/genres',getGamesByGenresController)
//[POST]
router.post('/insert', insertGenreController)
router.get('/', getGenresController);
//[Delete]
//[Update]

// export
module.exports = router;
