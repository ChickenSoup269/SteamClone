const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  game_id: { type: Number, required: true, unique: true },
  game_name: { type: String, required: true },
  description: String,
  developers: [String],
  dlc: [Number],
  genre_ids: [String],
  header_image: String,
  is_free: Boolean,
  movies_thumnail: [
    {
      thumbnail: String,
      webm_max: String,
    },
  ],
  option: [
    {
      optionText: String,
      percentSavings: Number,
      priceDiscounted: Number,
      rentalPrice: Number,
    },
  ],
  poster_url: String,
  publishers: [String],
  release_Date: String,
  sale_end_date: String,
  screenshots: [
    {
      id: Number,
      path_thumbnail: String,
      path_full: String,
    },
  ],
});

gameSchema.index({ game_id: 1 });
gameSchema.index({ game_name: 'text' }); // Index cho tìm kiếm

module.exports = mongoose.model('Game', gameSchema);