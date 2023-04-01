const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const GameConfiguration = require("../models/gameConfig");

// GET /games - get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /games/:game_id - get a specific game by ID
router.get("/:game_id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /games/:game_id/config - get a game's configuration by ID
router.get("/:game_id/config", async (req, res) => {
  try {
    const gameConfig = await GameConfiguration.findOne({
      game: req.params.game_id,
    });
    if (!gameConfig) {
      return res.status(404).json({ message: "Game configuration not found" });
    }
    res.json(gameConfig);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /games/:game_id/config - create or update a game's configuration by ID
router.post("/:game_id/config", async (req, res) => {
  try {
    const { name, maxPlayers, gameType, rules } = req.body;
    let gameConfig = await GameConfiguration.findOne({
      game: req.params.game_id,
    });
    if (!gameConfig) {
      gameConfig = new GameConfiguration({
        game: req.params.game_id,
        name,
        maxPlayers,
        gameType,
        rules,
      });
    } else {
      gameConfig.name = name;
      gameConfig.maxPlayers = maxPlayers;
      gameConfig.gameType = gameType;
      gameConfig.rules = rules;
    }
    await gameConfig.save();
    res.json(gameConfig);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /games/:game_id/config - update a game's configuration by ID
router.put("/:game_id/config", async (req, res) => {
  try {
    const { name, maxPlayers, gameType, rules } = req.body;
    const gameConfig = await GameConfiguration.findOneAndUpdate(
      { game: req.params.game_id },
      { name, maxPlayers, gameType, rules },
      { new: true, upsert: true }
    );
    res.json(gameConfig);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /games/:game_id/config - delete a game's configuration by ID
router.delete("/:game_id/config", async (req, res) => {
  try {
    const gameConfig = await GameConfiguration.findOneAndDelete({
      game: req.params.game_id,
    });
    if (!gameConfig) {
      return res.status(404).json({ message: "Game configuration not found" });
    }
    res.json({ message: "Game configuration deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /games - create a new game
router.post("/", async (req, res) => {
  try {
    const { name, publisher, genres } = req.body;
    const game = new Game({ name, publisher, genres });
    await game.save();
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /games/:game_id - update a game by ID
router.put("/:game_id", async (req, res) => {
  try {
    const { name, publisher, genres } = req.body;
    const game = await Game.findByIdAndUpdate(
      req.params.game_id,
      { name, publisher, genres },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /games/:game_id - delete a game by ID
router.delete("/:game_id", async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.game_id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    await GameConfiguration.findOneAndDelete({ game: req.params.game_id });
    await UserData.deleteMany({ game: req.params.game_id });
    res.json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
