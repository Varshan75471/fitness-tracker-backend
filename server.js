const express = require('express');
const connectDB = require('./config/db'); // Import the database connection
const cors = require('cors');
const morgan = require('morgan'); // For logging HTTP requests
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON payloads
app.use(morgan('dev')); // Log HTTP requests to the console

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://your-netlify-domain.netlify.app", // Replace with your actual Netlify domain
      "http://localhost:3000", // For local development (if needed)
    ],
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// API Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/goals', require('./routes/goals')); // Goals-related routes
app.use('/api/progress', require('./routes/progress')); // Progress tracking routes
app.use('/api/exercises', require('./routes/exercises')); // Exercise recommendation routes

// Default Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
