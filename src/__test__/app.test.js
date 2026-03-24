const request = require('supertest');

// 1. Mock การเชื่อมต่อ DB
jest.mock('../db', () => jest.fn().mockResolvedValue(true));

// 2. Mock Model 'DeployLog' แบบละเอียด
jest.mock('../models/item', () => {
  // สร้างฟังก์ชันจำลองสำหรับ Query (Chainable methods)
  const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([
      { version: '1.0.5', status: 'success', branch: 'main' }
    ])
  };

  // สร้าง Mock Constructor สำหรับ 'new DeployLog(data)'
  function MockModel(data) {
    this.data = data;
    this.save = jest.fn().mockResolvedValue({ _id: 'mock-id', ...data });
  }

  // ใส่ Static Methods (find, countDocuments, etc.)
  MockModel.find = jest.fn(() => mockQuery);
  MockModel.findOne = jest.fn(() => mockQuery); // สำหรับ /api/stats
  MockModel.countDocuments = jest.fn().mockResolvedValue(10); // สำหรับ /api/stats

  return MockModel;
});

const app = require('../index');

// ... (Test GET /api/info และ /health เหมือนเดิม) ...

describe('GET /api/deploys', () => {
  it('ต้องคืนค่า status 200', async () => {
    const res = await request(app).get('/api/deploys');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].version).toBe('1.0.5');
  });
});

// เพิ่ม Test สำหรับ POST เพื่อให้มั่นใจว่า API บันทึกได้จริง
describe('POST /api/deploys', () => {
  it('ต้องบันทึก log ใหม่และคืนค่า 201', async () => {
    const newLog = {
      version: "1.0.6",
      status: "success",
      branch: "main",
      commit: "abc1234"
    };
    const res = await request(app)
      .post('/api/deploys')
      .send(newLog);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.version).proptoBe('1.0.6');
  });
});