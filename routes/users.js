const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

const router = express.Router();

// GET /users - get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /users/:user_id - get a specific user by ID
router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /users/:user_id/data - get a user's data by ID
router.get("/:user_id/data", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /users - create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /users/:user_id - update a user by ID
router.put("/:user_id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.user_id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /users/:user_id - delete a user by ID
router.delete("/:user_id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /users/:user_id/data - update user data by user ID
router.put("/:user_id/data", async (req, res) => {
  try {
    const { score, level, progress } = req.body;
    const userData = await UserData.findOneAndUpdate(
      { user: req.params.user_id },
      { score, level, progress },
      { new: true, upsert: true }
    );
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
