const Cost = require('../models/cost');

// Adds a new cost item to the database.
// Required fields: description, category, userid, sum.
// Optional field: createdAt (defaults to current date if not provided).
exports.addCost = async (req, res) => {
    try {
        const { description, category, userid, sum, createdAt } = req.body;

        // Validate that all required fields are provided
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new cost document with current date or provided date
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            createdAt: createdAt ? new Date(createdAt) : new Date()
        });

        // Save to database
        await cost.save();
        res.status(201).json(cost); // Return created cost with status 201
    } catch (err) {
        // Handle server error
        res.status(500).json({ error: 'Failed to add cost', details: err.message });
    }
};

// Returns a monthly report of user costs grouped by category.
// Required query parameters: id (userid), year, month.
exports.getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // Validate query parameters
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing query parameters' });
        }

        const userIdNum = parseInt(id);
        const yearNum = parseInt(year);
        const monthNum = parseInt(month);

        if (isNaN(userIdNum) || isNaN(yearNum) || isNaN(monthNum)) {
            return res.status(400).json({ error: 'Invalid query parameters' });
        }

        // Set date range for the specified month
        const startDate = new Date(yearNum, monthNum - 1, 1);
        const endDate = new Date(yearNum, monthNum, 1);

        // Aggregate cost items by category
        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: userIdNum,
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { category: "$category" },
                    items: {
                        $push: {
                            sum: "$sum",
                            description: "$description",
                            day: { $dayOfMonth: "$createdAt" }
                        }
                    }
                }
            }
        ]);

        // Ensure all categories are present in response
        const categories = ['food', 'education', 'health', 'housing', 'sport'];
        const costsByCategory = categories.map(cat => {
            const catData = costs.find(c => c._id.category === cat);
            return { [cat]: catData ? catData.items : [] };
        });

        // Return structured report
        res.json({
            userid: userIdNum,
            year: yearNum,
            month: monthNum,
            costs: costsByCategory
        });
    } catch (err) {
        // Handle server error
        res.status(500).json({ error: 'Failed to generate report', details: err.message });
    }
};
