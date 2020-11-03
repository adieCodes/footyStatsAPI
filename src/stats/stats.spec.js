const request = require('supertest');
const app = require('../../app');
const connection = require('../db/connection');

describe('# Stats', () => {
  afterAll(() => {
    connection.end();
  });

  const exampleRes = {
    period: 'week',
    stats: [
      {
        teamName: expect.any(String),
        savesTier2: expect.any(Number),
        lastName: expect.any(String),
        savesTier1: expect.any(Number),
        subs: expect.any(Number),
        motms: expect.any(Number),
        points: expect.any(Number),
        redCards: expect.any(Number),
        concedes: expect.any(Number),
        assists: expect.any(Number),
        shotsTier1: expect.any(Number),
        shotsTier2: expect.any(Number),
        id: expect.any(Number),
        starts: expect.any(Number),
        goals: expect.any(Number),
        tacklesTier1: expect.any(Number),
        tacklesTier2: expect.any(Number),
        ownGoals: expect.any(Number),
        cleansheets: expect.any(Number),
        penSaves: expect.any(Number),
        firstName: expect.any(String),
        penMisses: expect.any(Number),
        passesTier1: expect.any(Number),
        position: expect.any(String),
        passesTier2: expect.any(Number),
        yellowCards: expect.any(Number),
      },
    ],
  };

  describe('# /stats/season', () => {
    it('Should return 200 and correct shape data', async () => {
      const res = await request(app).get('/stats/season');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('season');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(exampleRes.stats[0]);
      }
    });
  });
  // TODO: Add error handling
  //   TODO: Clarify what id is in res
});
