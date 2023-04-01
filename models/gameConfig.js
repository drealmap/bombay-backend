// gameConfiguration.js

const mongoose = require('mongoose');

const gameConfigurationSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  configType: { type: String, required: true },
  settings: { type: Object, required: true },
});

const GameConfiguration = mongoose.model('GameConfiguration', gameConfigurationSchema);

module.exports = GameConfiguration;
