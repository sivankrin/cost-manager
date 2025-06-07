const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Import route modules
const usersRouter = require('./routes/userRoutes');
const costsRouter = require('./routes/costRoutes');
const aboutRouter = require('./routes/aboutRoutes');

/**
 * Mount user-related routes under /api/users
 * Example: GET /api/users/:id
 */
app.use('/api/users', usersRouter);

/**
 * Mount cost-related routes under /api
 * Example: POST /api/add, GET /api/report
 */
app.use('/api', costsRouter);

/**
 * Mount about-related routes under /api/about
 */
app.use('/api/about', aboutRouter);

/**
 * Connect to MongoDB Atlas using connection string from environment variables
 * Uses new URL parser and unified topology options for compatibility
 * Logs success or error message accordingly
 */
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Export the Express app instance for testing or server startup
module.exports = app;
