const express = require('express');
const GenreController = require('../controllers/genresController');

const router = express.Router();

router.get('/', GenreController.getAllGenres);
router.get('/:genreId', GenreController.getGamesByGenre);

module.exports = router;