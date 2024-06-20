const { getGamesByGenres, getGenres } = require('../services/genresServices');

// [HTTP]
const getGenresController = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error in getGenresController:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
}
const getGamesByGenresController = async (req, res, next) => {
  try {
    const genresWithGames = await getGamesByGenres();
    res.json({ genresWithGames });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  getGenresController,
  getGamesByGenresController
};