const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route GET /:id
 * @description Retrieves detailed information about a user by their ID.
 * @access Public (or adjust if authentication is required)
 * @param {string} id - The unique identifier of the user
 * @returns {Object} JSON object containing user details
 *
 * Notes:
 * - Validate the user ID format before querying the database.
 * - Return appropriate HTTP status codes (e.g., 404 if user not found).
 * - Ensure the response matches the project specification for user details.
 */
router.get('/:id', userController.getUserDetails);

module.exports = router;
