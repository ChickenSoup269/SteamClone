const express = require('express');
const router = express.Router();
const { getGenresController } = require('../controller/genresController');
// route detail
router.get('/', getGenresController);
// export
module.exports = router;
