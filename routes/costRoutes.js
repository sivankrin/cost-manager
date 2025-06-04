const express = require('express');
const router = express.Router();

const { addCost, getMonthlyReport } = require('../controllers/costController');

/**
 * @route POST /add
 * @description Adds a new cost item to the database.
 * @access Public (or adjust if authentication is required)
 * @returns {Object} JSON response confirming success or failure
 *
 * Note:
 * - Ensure the request body includes all required fields as per project specs.
 * - Validate inputs and handle errors properly in the controller.
 */
router.post('/add', addCost);

/**
 * @route GET /report
 * @description Retrieves a detailed monthly cost report for all categories.
 * @access Public (or adjust if authentication is required)
 * @returns {Object} JSON report object showing costs aggregated by category and month
 *
 * Note:
 * - Confirm the report matches the format required in the final project document.
 * - Handle cases where no cost items exist (return empty or zero values accordingly).
 */
router.get('/report', getMonthlyReport);

module.exports = router;
