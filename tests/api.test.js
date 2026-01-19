const request = require('supertest');
const app = require('../backend/server'); // Points to the backend folder

describe('SentinelScale API Quality Suite', () => {
    
    test('Environment Status: Health Check returns 200', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });

    test('Data Integrity: API returns correct crypto structure', async () => {
        const res = await request(app).get('/api/prices');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('bitcoin');
        expect(res.body.bitcoin).toHaveProperty('usd');
    });
});