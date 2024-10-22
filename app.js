// app.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connections/db');
const {connectRedis, redisClient} = require('./connections/redis');
const Player = require('./models/Player');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();

app.use(bodyParser.json());

connectDB();
connectRedis();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/players', async (req, res) => {
  const { rank, tag, firstName, nationality, mainCharacter } = req.body;

  if (!rank || !tag || !firstName || !nationality || !mainCharacter) {
    return res.status(400).json({message: "Missing required fields."});
  }

  try {
    const existingPlayer = await Player.findOne({ rank: req.body.rank });
    if (existingPlayer) {
      return res.status(409).json({ message: "Rank already in use" });
    }

    const newPlayer = new Player(req.body);
    const player = await newPlayer.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/players/:rank', async (req, res) => {
  const rank = req.params.rank;
  const redisKey = `player:rank:${rank}`; 

  try {
    const cachedPlayer = await redisClient.get(redisKey);

    if (cachedPlayer) {
      return res.json(JSON.parse(cachedPlayer)); 
    }

    const player = await Player.findOne({ rank });
    if (!player) return res.status(404).json({ message: "Player not found" });

    await redisClient.set(redisKey, JSON.stringify(player), { EX: 1800 });
    console.log("Successfully saved on Redis with key vaule: " + redisKey);

    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/players/nationality/:nationality', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const nationality = req.params.nationality.toUpperCase(); 
  const redisKey = `players:nationality:${nationality}:page:${page}:limit:${limit}`;

  try {
    const cachedPlayers = await redisClient.get(redisKey);

    if (cachedPlayers) {
      return res.json(JSON.parse(cachedPlayers));
    }

    const totalPlayers = await Player.countDocuments({ nationality });
    if (totalPlayers === 0) {
      return res.status(404).json({ message: "No players found with this nationality" });
    }

    const totalPages = Math.ceil(totalPlayers / limit);

    const players = await Player.find({ nationality })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    await redisClient.set(redisKey, JSON.stringify({
      totalPlayers,
      totalPages,
      currentPage: parseInt(page),
      players,
    }), { EX: 1800 });

    console.log("Successfully saved on Redis with key vaule: " + redisKey);

    res.json({
      totalPlayers,
      totalPages,
      currentPage: parseInt(page),
      players,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/players/:rank', async (req, res) => {
  try {
    const { rank, tag, firstName, nationality, mainCharacter } = req.body;

    if (!firstName || !rank || !nationality || !tag || !mainCharacter ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rank && rank !== req.params.rank) {
      const existingPlayer = await Player.findOne({ rank: rank });
      if (existingPlayer) {
        return res.status(409).json({ message: "Rank already in use" });
      }
    }

    const updatedPlayer = await Player.findOneAndUpdate(
      { rank: req.params.rank }, 
      req.body,                 
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.patch('/players/:rank', async (req, res) => {
  try {
    if (req.body.rank && req.body.rank !== req.params.rank) {
      const existingPlayer = await Player.findOne({ rank: req.body.rank });
      if (existingPlayer) {
        return res.status(409).json({ message: "Rank already in use" });
      }
    }

    const updatedPlayer = await Player.findOneAndUpdate(
      { rank: req.params.rank },  
      { $set: req.body },         
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
