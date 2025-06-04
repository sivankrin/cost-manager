/**
 * @function getAbout
 * @description Returns information about the team members.
 * This route responds to GET requests on /api/about and returns an array of team members,
 * each with `first_name` and `last_name` fields.
 *
 * Example response:
 * [
 *   { "first_name": "Sivan", "last_name": "Kringel" },
 *   { "first_name": "Shiran", "last_name": "Aharoni" }
 * ]
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
exports.getAbout = (req, res) => {
    res.json([
        { first_name: 'Sivan', last_name: 'Kringel' },
        { first_name: 'Shiran', last_name: 'Aharoni' },
    ]);
};
