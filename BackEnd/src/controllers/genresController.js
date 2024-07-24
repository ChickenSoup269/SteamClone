const {
  getGamesByGenres,
  getAllGenres,
  getDetailgenres,
  insertGenres,
  deleteGenres,
  updateGenresById,
  getGenresbygame,
} = require("../services/genresServices")
// Get All
const getGenresController = async (req, res) => {
  try {
    const genres = await getAllGenres()
    res.status(200).json(genres)
  } catch (error) {
    console.error("Error in getGenresController:", error)
    res.status(500).json({ error: "Failed to fetch genres" })
  }
}
// [Get] GenresbyGames
const getGenresWithGamesController = async (req, res) => {
  try {
    const genresWithGames = await getGenresbygame()
    res.status(200).json(genresWithGames)
  } catch (error) {
    console.error("Error in getGenresWithGamesController:", error)
    res.status(500).json({ error: "Failed to fetch genres with games" })
  }
}
// [GET] Detail
const getDetailController = async (req, res) => {
  try {
    const { genre_id } = req.params
    const games = await getDetailgenres(genre_id)
    if (!games) {
      res.status(404).json({ error: "No games found for this genre." })
    } else {
      res.status(200).json(games)
    }
  } catch (error) {
    console.error("Error in getGamesByGenreController:", error)
    res.status(500).json({ error: "Failed to get games by genre." })
  }
}
// Insert [POST]
const insertGenreController = async (req, res) => {
  try {
    // get data body req
    const { genre_id, description } = req.body
    if (!genre_id || !description) {
      return res
        .status(400)
        .json({ error: "genre_id and description are required." })
    }
    const genreData = { genre_id, description }
    const result = await insertGenres(genreData)
    if (!result || !result.insertedId) {
      throw new Error("Failed to insert genre.")
    }
    res
      .status(201)
      .json({ message: "Genre inserted successfully.", genre: result })
  } catch (error) {
    if (error.message.includes("Duplicate genre ID")) {
      res.status(409).json({ error: "Genre already exists." })
    } else if (
      error.message.includes("genre_id and description are required")
    ) {
      res.status(400).json({ error: "genre_id and description are required." })
    } else {
      console.error("Error in insertGenreController:", error)
      res.status(500).json({ error: "Failed to insert genre." })
    }
  }
}
//[Delete]
const deleteGenresController = async (req, res) => {
  try {
    const { genre_id } = req.params
    if (!genre_id) {
      return res.status(400).json({ error: "genre_id is required." })
    }
    const result = await deleteGenres(genre_id)
    if (!result || result.deletedCount === 0) {
      throw new Error("Failed to delete genre.")
    }
    res.status(200).json({ message: "Genre deleted successfully." })
  } catch (error) {
    if (error.message.includes("Genre not found.")) {
      res.status(404).json({ error: "Genre not found." })
    } else {
      console.error("Error in deleteGenreController:", error)
      res.status(500).json({ error: "Failed to delete genre." })
    }
  }
}
//[Update]
const updateGenresController = async (req, res) => {
  const { genre_id } = req.params // Lấy genre_id từ params của request
  const updateData = req.body // Dữ liệu cập nhật từ body của request

  try {
    // Gọi service để cập nhật genre trong MongoDB
    const updatedGenre = await updateGenresById(genre_id, updateData)
    res
      .status(200)
      .json({ message: "Genre updated successfully.", genre: updatedGenre })
  } catch (error) {
    // Xử lý lỗi từ service
    if (error.message === "Genre not found.") {
      res.status(404).json({ error: `Genre with ID ${genre_id} not found.` })
    } else {
      console.error("Error in updateGenreController:", error)
      res.status(500).json({ error: "Failed to update genre." })
    }
  }
}
module.exports = {
  getGenresController,
  getDetailController,
  insertGenreController,
  deleteGenresController,
  updateGenresController,
  getGenresWithGamesController,
}
