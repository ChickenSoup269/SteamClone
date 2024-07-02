const express = require('express');
const router = express.Router();
const { getGamesByGenresController, getGenresController,
  insertGenreController, deleteGenresController,updateGenresController } = require('../controller/genresController');
// route detail
//[POST]
router.post('/insert', insertGenreController)
//[Delete]
router.delete('/delete/:genre_id',deleteGenresController)
//[Update]
router.put('/update/:genre_id',updateGenresController)
//[GET]
router.get('/genres',getGenresController)
router.get('/', getGamesByGenresController);


// export
module.exports = router;
