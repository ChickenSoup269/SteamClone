const { getGamesByGenres } = require('../services/genresServices');
const getGenresController = async (req, res, next) => {
  try {
    const genresWithGames = await getGamesByGenres();
    res.json({ genresWithGames });
  } catch (error) {
    next(error); 
  }
};
module.exports = {
  getGenresController
};