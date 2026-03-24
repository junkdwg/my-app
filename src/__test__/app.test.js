const request = require('supertest');
jest.mock('../db', () => jest.fn().mockResolvedValue(true));
const app = require('../index');

describe('GET /api/info', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
  });
  it('ต้องมี field message', async () => {
    const res = await request(app).get('/api/info');
    expect(res.body).toHaveProperty('message');
  });
  it('ต้องมี field version', async () => {
    const res = await request(app).get('/api/info');
    expect(res.body).toHaveProperty('version');
  });
});

describe('GET /health', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });
  it('ต้องมี status เป็น ok', async () => {
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/deploys', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/api/deploys');
    expect(res.statusCode).toBe(200);
  });
});