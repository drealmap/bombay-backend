// game.js

const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  publisher: { type: String },
  releaseDate: { type: Date, required: true, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
