const mongoose = require('mongoose');

// Defines the schema for a user in the database
const userSchema = new mongoose.Schema({
    // Unique numeric ID for the user (required)
    id: { type: Number, unique: true, required: true },

    // First name of the user
    first_name: String,

    // Last name of the user
    last_name: String
});

// Exports the Mongoose model for use in the application
module.exports = mongoose.model('User', userSchema);
