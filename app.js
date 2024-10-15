// app.js

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const Player = require('./models/Player');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Add a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rank:
 *                 type: integer
 *               tag:
 *                 type: string
 *               firstName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               mainCharacter:
 *                 type: string
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Bad request
 */
app.post('/players', async (req, res) => {
  try {
    const existingPlayer = await Player.findOne({ rank: req.body.rank });
    if (existingPlayer) {
      return res.status(400).json({ message: "Rank already in use" });
    }

    const newPlayer = new Player(req.body);
    const player = await newPlayer.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   rank:
 *                     type: integer
 */
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /players/{rank}:
 *   get:
 *     summary: Get a player by rank
 *     parameters:
 *       - in: path
 *         name: rank
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player's rank
 *     responses:
 *       200:
 *         description: The player information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 rank:
 *                   type: integer
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
app.get('/players/:rank', async (req, res) => {
  try {
    const player = await Player.findOne({ rank: req.params.rank });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /players/nationality/{nationality}:
 *   get:
 *     summary: Get players by nationality
 *     parameters:
 *       - in: path
 *         name: nationality
 *         required: true
 *         schema:
 *           type: string
 *         description: The nationality of the players
 *     responses:
 *       200:
 *         description: A list of players with the same nationality
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   rank:
 *                     type: integer
 *                   nationality:
 *                     type: string
 *                   mainCharacter:
 *                     type: string
 *       404:
 *         description: No players found with the given nationality
 *       500:
 *         description: Server error
 */
app.get('/players/nationality/:nationality', async (req, res) => {
  try {
    const players = await Player.find({ nationality: req.params.nationality.toUpperCase() });
    if (!players.length) return res.status(404).json({ message: "No players found with this nationality" });
    
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /players/{rank}:
 *   put:
 *     summary: Update a player by rank
 *     parameters:
 *       - in: path
 *         name: rank
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player's rank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rank:
 *                 type: integer
 *               tag:
 *                 type: string
 *               firstName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               mainCharacter:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated player information
 *       404:
 *         description: Player not found
 *       400:
 *         description: Bad request
 */
app.put('/players/:rank', async (req, res) => {
  try {
    if (req.body.rank && req.body.rank !== req.params.rank) {
      const existingPlayer = await Player.findOne({ rank: req.body.rank });
      if (existingPlayer) {
        return res.status(400).json({ message: "Rank already in use" });
      }
    }

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

/**
 * @swagger
 * /players/{rank}:
 *   delete:
 *     summary: Delete a player by rank
 *     parameters:
 *       - in: path
 *         name: rank
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player's rank
 *     responses:
 *       200:
 *         description: Player deleted
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
app.delete('/players/:rank', async (req, res) => {
  try {
    const deletedPlayer = await Player.findOneAndDelete({ rank: req.params.rank });
    if (!deletedPlayer) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /players/{rank}:
 *   patch:
 *     summary: Partially update a player by rank
 *     parameters:
 *       - in: path
 *         name: rank
 *         required: true
 *         schema:
 *           type: integer
 *         description: The player's rank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *               firstName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               mainCharacter:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated player information
 *       400:
 *         description: Bad request (Rank already in use)
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
app.patch('/players/:rank', async (req, res) => {
  try {
    if (req.body.rank && req.body.rank !== req.params.rank) {
      const existingPlayer = await Player.findOne({ rank: req.body.rank });
      if (existingPlayer) {
        return res.status(400).json({ message: "Rank already in use" });
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
    res.status(500).json({ message: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
