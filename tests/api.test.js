const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

/**
 * Connect to MongoDB before running the tests.
 * Use connection options for compatibility and timeout control.
 */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    });
});

/**
 * Close the MongoDB connection after all tests have finished.
 */
afterAll(async () => {
    await mongoose.connection.close();
});

/**
 * Tests for GET /api/users/:id endpoint
 */
describe('GET /api/users/:id', () => {
    it('should return user details and total cost', async () => {
        const res = await request(app).get('/api/users/123123');

        // Expect HTTP 200 OK
        expect(res.statusCode).toBe(200);

        // Check response properties
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('id', 123123);
        expect(res.body).toHaveProperty('total');

        // total should be a number
        expect(typeof res.body.total).toBe('number');
    });

    it('should return 404 if user does not exist', async () => {
        const res = await request(app).get('/api/users/999999');

        // Expect HTTP 404 Not Found
        expect(res.statusCode).toBe(404);

        // Response should include an error message
        expect(res.body).toHaveProperty('error');
    });
});

/**
 * Tests for GET /api/about endpoint
 */
describe('GET /api/about', () => {
    it('should return list of team members', async () => {
        const res = await request(app).get('/api/about');

        // Expect HTTP 200 OK
        expect(res.statusCode).toBe(200);

        // Response body should be an array
        expect(Array.isArray(res.body)).toBe(true);

        // Each team member should have first_name and last_name
        res.body.forEach(member => {
            expect(member).toHaveProperty('first_name');
            expect(member).toHaveProperty('last_name');
        });
    });
});

/**
 * Tests for GET /api/report endpoint
 */
describe('GET /api/report', () => {
    it('should return report grouped by categories', async () => {
        const res = await request(app).get('/api/report?id=123123&year=2025&month=5');

        // Expect HTTP 200 OK
        expect(res.statusCode).toEqual(200);

        // Check that response includes expected properties with correct values
        expect(res.body).toHaveProperty('userid', 123123);
        expect(res.body).toHaveProperty('year', 2025);
        expect(res.body).toHaveProperty('month', 5);
        expect(res.body).toHaveProperty('costs');

        // costs should be an array
        expect(Array.isArray(res.body.costs)).toBe(true);
    });

    it('should return 400 for missing parameters', async () => {
        const res = await request(app).get('/api/report?id=123123');

        // Expect HTTP 400 Bad Request
        expect(res.statusCode).toBe(400);

        // Response should include an error message
        expect(res.body).toHaveProperty('error');
    });
});
