const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  high_score: {
    type: Number,
    required: true,
  },
  // high_scores: [{
  //   game_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Game'
  //   },
  //   score: {
  //     type: Number,
  //     required: true
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //     default: Date.now
  //   }
  // }],
  settings: {
    sound_enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    music_enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    language: {
      type: String,
      required: true,
      default: 'en'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
