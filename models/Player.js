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
    default: "####",  
    required: true,
  },
  firstName: {
    type: String,
    default: "Unknown",
    required:true
  },
  nationality: {
    type: String,
    default: "UNK",
    required: true
  },
  mainCharacter: {
    type: String,
    default: "Mario",
    required: true,
  }
});

const Player = mongoose.model('Player', PlayerSchema, 'Top');

module.exports = Player;
