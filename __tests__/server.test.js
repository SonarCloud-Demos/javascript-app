const request = require('supertest');
const app = require('../server');

describe('API', () => {
  test('GET /api/hello returns greeting JSON', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ express: 'Hello From Express' });
  });

  test('GET /api/goodbye returns farewell JSON', async () => {
    const res = await request(app).get('/api/goodbye');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ express: 'Goodbye From Express' });
  });

  test('POST /api/func echoes posted body', async () => {
    const res = await request(app)
      .post('/api/func')
      .send({ post: 'abc' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.text).toBe('You sent:abc');
  });

  test('GET /api/users returns array', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/products returns array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
