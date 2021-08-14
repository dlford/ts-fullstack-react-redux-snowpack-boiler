import * as request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  test('It should respond with JSON { success: true }', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({ success: true });
    expect(response.statusCode).toBe(200);
  });
});
