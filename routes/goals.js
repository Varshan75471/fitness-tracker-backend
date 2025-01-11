const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Auth middleware
const Goal = require('../models/Goal');

// @route POST /api/goals
// @desc Add a new fitness goal
// @access Private
router.post('/', auth, async (req, res) => {
  const { goalType, target } = req.body;

  try {
    const newGoal = new Goal({
      user: req.user.id,
      goalType,
      target,
    });

    const goal = await newGoal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET /api/goals
// @desc Get all user goals
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
