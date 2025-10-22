import request from 'supertest';
import server from '../server.js';

describe('First server test', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('Hello World');
  });
});