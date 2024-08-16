const express = require("express")
const router = express.Router()
const {
  getGenresController,
  getDetailController,
  insertGenreController,
  deleteGenresController,
  updateGenresController,
  getGenresWithGamesController,
} = require("../controllers/genresController")
// route detail
//[POST]
router.post("/insert", insertGenreController)
//[Delete]
router.delete("/delete/:genre_id", deleteGenresController)
//[Update]
router.put("/update/:genre_id", updateGenresController)
//[GET]
router.get("/detailGernesbyGames/:genre_id", getDetailController)
//[GET]
router.get("/getallGenresbyGame", getGenresWithGamesController)
//[GET]
router.get("/", getGenresController)
// export
module.exports = router
