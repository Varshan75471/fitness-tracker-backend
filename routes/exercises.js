const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Auth middleware

// Hardcoded recommendations (replace with dynamic logic if needed)
const exerciseRecommendations = [
  {
    goalType: 'Weight Loss',
    exercises: ['Running', 'Cycling', 'Jump Rope'],
  },
  {
    goalType: 'Muscle Gain',
    exercises: ['Weightlifting', 'Push-ups', 'Pull-ups'],
  },
  {
    goalType: 'Flexibility',
    exercises: ['Yoga', 'Stretching', 'Pilates'],
  },
];

// @route GET /api/exercises
// @desc Get exercise recommendations based on goal
// @access Private
router.get('/', auth, async (req, res) => {
  const { goalType } = req.query;

  try {
    const recommendation = exerciseRecommendations.find((rec) => rec.goalType === goalType);

    if (!recommendation) {
      return res.status(404).json({ msg: 'No recommendations found for this goal' });
    }

    res.json(recommendation.exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
