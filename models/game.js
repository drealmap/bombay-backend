// game.js

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categories: { type: [String], required: true },
  publisher: { type: String },
  releaseDate: { type: Date },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
