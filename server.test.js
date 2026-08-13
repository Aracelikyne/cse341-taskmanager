const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

// A valid 24-character hex string to pass the ObjectId validation check
const dummyId = '650c1f1e1c9d440000a1b1c1';

describe('Test Handlers', () => {
  // Pause for 2 seconds to allow MongoDB to connect
  beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  // ==========================
  // USERS TESTS
  // ==========================
  test('responds to GET All /users', async () => {
    const res = await request.get('/users');
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET Single /users/:id', async () => {
    const res = await request.get(`/users/${dummyId}`);
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  // ==========================
  // PROJECTS TESTS
  // ==========================
  test('responds to GET All /projects', async () => {
    const res = await request.get('/projects');
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET Single /projects/:id', async () => {
    const res = await request.get(`/projects/${dummyId}`);
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });
  
  // ==========================
  // TASKS TESTS
  // ==========================
  test('responds to GET All /tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET Single /tasks/:id', async () => {
    const res = await request.get(`/tasks/${dummyId}`);
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  // ==========================
  // CATEGORIES TESTS
  // ==========================
  test('responds to GET All /categories', async () => {
    const res = await request.get('/categories');
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET Single /categories/:id', async () => {
    const res = await request.get(`/categories/${dummyId}`);
    expect(res.header['content-type']).toEqual(expect.stringContaining('application/json'));
    expect(res.statusCode).toBe(200);
  });
});