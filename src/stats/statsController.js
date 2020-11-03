const connection = require('../db/connection');

module.exports = (req, res) => {
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

  connection.query(seasonQuery, (err, results) => {
    if (err) throw err;
    const resObj = {
      period: 'season',
      stats: results,
    };
    res.json(resObj);
  });
};
