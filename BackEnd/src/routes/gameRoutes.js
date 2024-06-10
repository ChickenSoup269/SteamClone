const express = require('express');
const router = express.Router();
const { getGames } = require('../controller/gameController');
// route detail
router.get('/', getGames);
// export
module.exports = router;
