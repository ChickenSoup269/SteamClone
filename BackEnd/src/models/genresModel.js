const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

genreSchema.index({ genre_id: 1 });
module.exports = mongoose.model('Genre', genreSchema);