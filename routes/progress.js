const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Auth middleware
const Progress = require('../models/Progress');

// @route POST /api/progress
// @desc Log daily progress
// @access Private
router.post('/', auth, async (req, res) => {
  const { exercises } = req.body;

  try {
    const newProgress = new Progress({
      user: req.user.id,
      exercises,
    });

    const progress = await newProgress.save();
    res.status(201).json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET /api/progress
// @desc Get user progress
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id }).sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
