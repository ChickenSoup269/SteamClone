const { getGamesByGenres, getAllGenres,insertGenres } = require('../services/genresServices');

// [HTTP]
// Get All
const getGenresController = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error in getGenresController:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
}
// Get game by genres
const getGamesByGenresController = async (req, res, next) => {
  try {
    const genresWithGames = await getGamesByGenres();
    res.json({ genresWithGames });
  } catch (error) {
    next(error); 
  }
};
// Insert 
const insertGenreController = async (req, res) => {
  try {
    const { genre_id, description } = req.body; 
    if (!genre_id || !description) {
      return res.status(400).json({ error: 'genre_id and description are required.' });
    }
    const genreData = {
      genre_id,
      description
    };
    const result = await insertGenres(genreData);

    if (!result) {
      throw new Error('Failed to insert genre.');
    }
    res.status(201).json({ message: 'Genre inserted successfully.', genre: result });
  } catch (error) {
    if (error.message.includes('Duplicate genre ID')) {
      res.status(409).json({ error: 'Genre already exists.' });
    } else {
      console.error('Error in insertGenreController:', error);
      res.status(500).json({ error: 'Failed to insert genre.' });
    }
  }
};
module.exports = {
  getGenresController,
  getGamesByGenresController,
  insertGenreController
};