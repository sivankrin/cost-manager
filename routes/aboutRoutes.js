const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Route for handling GET requests to /api/about/
// Responds with a list of team members
router.get('/', aboutController.getAbout);

// Export the router to be used in the main app
module.exports = router;
