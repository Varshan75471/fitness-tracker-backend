const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  goalType: {
    type: String, // Example: "Weight Loss", "Muscle Gain"
    required: true,
  },
  target: {
    type: String, // Example: "Lose 5kg in 2 months"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Goal', GoalSchema);
