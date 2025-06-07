const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const costRoutes = require('./routes/costRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

/**
 * Mount user-related routes under /api/users
 * Example endpoints:
 * GET /api/users/:id
 */
app.use('/api/users', userRoutes);

/**
 * Mount cost-related routes under /api
 * Example endpoints:
 * POST /api/add
 * GET /api/report
 */
app.use('/api', costRoutes);

/**
 * Mount about-related routes under /api/about
 */
app.use('/api/about', aboutRoutes);

const PORT = process.env.PORT || 3000;

/**
 * Connect to MongoDB using connection string from environment variables.
 * On successful connection, start the server.
 * On failure, log the error.
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
