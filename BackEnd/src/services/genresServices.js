const Genre = require('../models/genresModel');
const Game = require('../models/gameModel');

class GenreService {
  static async createGenre(genreData) {
    const genre = new Genre(genreData);
    return await genre.save();
  }

  static async getAllGenres() {
    return await Genre.find().lean();
  }

  static async getGenreById(genreId) {
    return await Genre.findOne({ genre_id: genreId }).lean();
  }

  static async getGamesByGenre(genreId, page, limit) {
    const genre = await Genre.findOne({ genre_id: genreId }).lean();
    if (!genre) return null;

    return await Game.find({ genre_ids: genreId })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
  }

  static async updateGenre(genreId, updateData) {
    // Loại bỏ genre_id khỏi updateData
    delete updateData.genre_id;

    const genre = await Genre.findOneAndUpdate(
      { genre_id: genreId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!genre) {
      return null;
    }

    return genre;
  }

  static async deleteGenre(genreId) {
    // Kiểm tra xem genre có được sử dụng trong game không
    const games = await Game.findOne({ genre_ids: genreId });
    if (games) {
      throw new Error('Cannot delete genre used by games');
    }

    const result = await Genre.deleteOne({ genre_id: genreId });
    return result.deletedCount > 0;
  }
}

module.exports = GenreService;