const GenreService = require('../services/GenreService');

class genresController {
  // Create
  static async createGenre(req, res) {
    try {
      const genreData = req.body;
      const genre = await GenreService.createGenre(genreData);
      res.status(201).json(genre);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Read - Get all genres
  static async getAllGenres(req, res) {
    try {
      const genres = await GenreService.getAllGenres();
      res.status(200).json(genres);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Read - Get genre by ID
  static async getGenreById(req, res) {
    try {
      const { genreId } = req.params;
      const genre = await GenreService.getGenreById(genreId);
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(genre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Read - Get games by genre
  static async getGamesByGenre(req, res) {
    try {
      const { genreId } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const games = await GenreService.getGamesByGenre(genreId, parseInt(page), parseInt(limit));
      if (!games) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update
  static async updateGenre(req, res) {
    try {
      const { genreId } = req.params;
      const updateData = req.body;
      const genre = await GenreService.updateGenre(genreId, updateData);
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(genre);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Delete
  static async deleteGenre(req, res) {
    try {
      const { genreId } = req.params;
      const deleted = await GenreService.deleteGenre(genreId);
      if (!deleted) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = genresController;