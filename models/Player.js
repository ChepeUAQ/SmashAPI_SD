// models/Player.js

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    default: "Unknown",
  },
  nationality: {
    type: String,
    required: true,
  },
  mainCharacter: {
    type: String,
    required: true,
  }
});

const Player = mongoose.model('Player', PlayerSchema, 'Top');

module.exports = Player;
