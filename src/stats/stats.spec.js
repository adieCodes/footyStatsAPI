const request = require('supertest');
const app = require('../../app');
const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

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

  describe('## /stats/season', () => {
    it('Should return 200 and correct shape data', async () => {
      const res = await request(app).get('/stats/season');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('season');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(exampleRes.stats[0]);
      }
    });
  });

  describe('##', () => {
    it('Should return season query by default', () => {
      const seasonQuery = `SELECT
t.name as teamName,
sp.savesTier2,
p.lastName,
sp.savesTier1,
sp.subs,
sp.motms,
sp.points,
sp.redCards,
sp.concedes,
sp.assists,
sp.shotsTier1,
sp.shotsTier2,
sp.playerId as id,
sp.starts,
sp.goals,
sp.tacklesTier1,
sp.tacklesTier2,
sp.ownGoals,
sp.cleansheets,
sp.penSaves,
p.firstName,
sp.penMisses,
sp.passesTier1,
p.position,
sp.passesTier2,
sp.yellowCards
FROM practical.seasonPlayers sp
inner join players p on sp.playerId = p.id
inner join teams t on p.teamid = t.id;`;

      const res = statsQuery();

      expect(res).toEqual(seasonQuery);
    });
  });
  // TODO: Add error handling
  //   TODO: Clarify what id is in res
});
