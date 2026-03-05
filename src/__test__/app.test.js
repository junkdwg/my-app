const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('ต้องมี field message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toHaveProperty('message');
  });

  it('ต้องมี field version', async () => {
    const res = await request(app).get('/');
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