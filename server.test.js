const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

describe('Test Handlers', () => {
  // Pause for 2 seconds to allow MongoDB to connect
  beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('responds to /users', async () => {
    const res = await request.get('/users');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /projects', async () => {
    const res = await request.get('/projects');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
  
  test('responds to /tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /categories', async () => {
    const res = await request.get('/categories');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});