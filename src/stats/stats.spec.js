/* eslint-disable security/detect-object-injection */
const request = require('supertest');
const app = require('../../app');
const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

describe('# Stats', () => {
  afterAll(() => {
    connection.end();
  });

  //   expected shape of stat object
  const statShape = {
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
  };

  describe('## /stats/season', () => {
    it('Should return 200 and correct shape data', async () => {
      const res = await request(app).get('/stats/season');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('season');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(statShape);
      }
      //   Returns all season stats
      expect(res.body.stats.length).toEqual(487);
    });
  });

  describe('## /stats/week', () => {
    it('Should return 200, correct shape data and only stats for that week', async () => {
      const res = await request(app).get('/stats/week?weekId=1');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('week');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(statShape);
      }
      //   Returns only week stats for weekid
      expect(res.body.stats.length).toEqual(288);
    });
    it('Should return 200, correct shape data and all weekly stats if no query', async () => {
      const res = await request(app).get('/stats/week');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('week');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(statShape);
      }
      //   Returns all week stats
      expect(res.body.stats.length).toEqual(2447);
    });
    it('Should return 200 and empty stats array if invalid weekid', async () => {
      const res = await request(app).get('/stats/week?weekId=allthethings');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('week');
      expect(res.body.stats.length).toEqual(0);
    });
  });

  describe('## /stats/month', () => {
    it('Should return 200, correct shape data and only stats for that month', async () => {
      const res = await request(app).get('/stats/month?monthId=9');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('month');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(statShape);
      }
      //   Returns only week stats for weekid
      expect(res.body.stats.length).toEqual(414);
    });
    it('Should return 200, correct shape data and all monthly stats if no query', async () => {
      const res = await request(app).get('/stats/month');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('month');
      for (let i = 0; i < res.body.stats.length; i += 1) {
        expect(res.body.stats[i]).toEqual(statShape);
      }
      //   Returns all week stats
      expect(res.body.stats.length).toEqual(1070);
    });
    it('Should return 200 and empty stats array if invalid monthid', async () => {
      const res = await request(app).get('/stats/month?monthId=allthethings');

      expect(res.statusCode).toEqual(200);
      expect(res.body.period).toEqual('month');
      expect(res.body.stats.length).toEqual(0);
    });
  });

  describe(`## stats/invalid`, () => {
    it('Should throw 400', async () => {
      const res = await request(app).get('/stats/invalid');
      const text = JSON.parse(res.text);

      expect(res.statusCode).toEqual(400);
      expect(text.message).toContain('Invalid param: We only accept');
    });
  });

  describe('## statsQueryBuilder', () => {
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

    it('Returns weekly query when passed that param', () => {
      const weekQuery = `SELECT
t.name as teamName,
wp.savesTier2,
p.lastName,
wp.savesTier1,
wp.subs,
wp.motms,
wp.points,
wp.redCards,
wp.concedes,
wp.assists,
wp.shotsTier1,
wp.shotsTier2,
wp.playerId as id,
wp.starts,
wp.goals,
wp.tacklesTier1,
wp.tacklesTier2,
wp.ownGoals,
wp.cleansheets,
wp.penSaves,
p.firstName,
wp.penMisses,
wp.passesTier1,
p.position,
wp.passesTier2,
wp.yellowCards
FROM practical.weekPlayers wp
inner join players p on wp.playerId = p.id
inner join teams t on p.teamid = t.id where wp.weekid = 1;`;

      const res = statsQuery('week', 1);

      expect(res).toEqual(weekQuery);
    });
  });
  it('Returns monthly query when passed that param', () => {
    const monthlyQuery = `SELECT
t.name as teamName,
mp.savesTier2,
p.lastName,
mp.savesTier1,
mp.subs,
mp.motms,
mp.points,
mp.redCards,
mp.concedes,
mp.assists,
mp.shotsTier1,
mp.shotsTier2,
mp.playerId as id,
mp.starts,
mp.goals,
mp.tacklesTier1,
mp.tacklesTier2,
mp.ownGoals,
mp.cleansheets,
mp.penSaves,
p.firstName,
mp.penMisses,
mp.passesTier1,
p.position,
mp.passesTier2,
mp.yellowCards
FROM practical.monthPlayers mp
inner join players p on mp.playerId = p.id
inner join teams t on p.teamid = t.id where mp.monthid = 4;`;

    const res = statsQuery('month', 4);

    expect(res).toEqual(monthlyQuery);
  });
});
