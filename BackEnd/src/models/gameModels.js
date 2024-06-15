const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    game_id: { type: Number, required: true, unique: true },
    game_name: { type: String, required: true },
    header_image: { type: String }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
