const request = require('supertest');
const app = require('../../app');

describe('# Stats', () => {
  it('Should return 200', async () => {
    const res = await request(app).get('/stats');

    expect(res.statusCode).toEqual(200);
  });
  // TODO: Add error handling
});
