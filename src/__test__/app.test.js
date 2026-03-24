const request = require('supertest');

jest.mock('../db', () => jest.fn().mockResolvedValue(true));

// Mock DeployLog model ให้ครบ
jest.mock('../models/item', () => ({
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      limit: jest.fn().mockResolvedValue([])
    })
  }),
  countDocuments: jest.fn().mockResolvedValue(0),
  findOne: jest.fn().mockReturnValue({
    sort: jest.fn().mockResolvedValue(null)
  })
}));

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

describe('GET /api/stats', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.statusCode).toBe(200);
  });
});