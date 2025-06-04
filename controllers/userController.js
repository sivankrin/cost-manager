const User = require('../models/user');
const Cost = require('../models/cost');

// Returns user details and the total sum of all their cost items.
// Route: GET /api/users/:id
exports.getUserDetails = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Validate the user ID
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Find the user by ID
        const user = await User.findOne({ id });

        // Return 404 if user not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate the total sum of all costs for the user
        const totalCosts = await Cost.aggregate([
            { $match: { userid: id } },
            { $group: { _id: null, total: { $sum: '$sum' } } }
        ]);

        // Return user details along with the total cost (0 if none found)
        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total: totalCosts.length ? totalCosts[0].total : 0
        });

    } catch (err) {
        // Return 500 error if server fails
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};
