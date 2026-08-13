const supertest = require('supertest');
// Point Supertest directly to your live deployed API
const request = supertest('https://cse341-taskmanager.onrender.com');

describe('Test Handlers', () => {

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