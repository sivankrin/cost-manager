const mongoose = require('mongoose');

// Defines the schema for a cost item in the database
const costSchema = new mongoose.Schema({
    // Description of the expense
    description: String,

    // Category of the expense (e.g., food, health, etc.)
    category: String,

    // ID of the user who made the expense
    userid: Number,

    // Amount of the expense
    sum: Number,

    // Date the expense was created (defaults to current date if not provided)
    createdAt: { type: Date, default: Date.now }
});

// Exports the Mongoose model for use in the application
module.exports = mongoose.model('Cost', costSchema);
