const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

module.exports = (req, res) => {
  const { period } = req.params;
  const searchKey = period !== 'season' ? `${period}Id` : null;
  const periodId = period !== 'season' ? req.query[searchKey] : null;
  const seasonQuery = statsQuery(period, periodId);

  connection.query(seasonQuery, (err, results) => {
    if (err) throw err;
    const resObj = {
      period: req.params.period,
      stats: results,
    };
    res.json(resObj);
  });
};
