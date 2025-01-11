const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      name: String, // Exercise name
      duration: Number, // Duration in minutes
      caloriesBurned: Number, // Calories burned
    },
  ],
});

module.exports = mongoose.model('Progress', ProgressSchema);
