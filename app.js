
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const Player = require('./models/Player');

const app = express();

app.use(bodyParser.json());

connectDB();

app.post('/players', async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    const player = await newPlayer.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/players/:rank', async (req, res) => {
  try {
    const player = await Player.findOne({ rank: req.params.rank });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/players/:rank', async (req, res) => {
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      { rank: req.params.rank },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlayer) return res.status(404).json({ message: "Player not found" });
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/players/:rank', async (req, res) => {
  try {
    const deletedPlayer = await Player.findOneAndDelete({ rank: req.params.rank });
    if (!deletedPlayer) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
