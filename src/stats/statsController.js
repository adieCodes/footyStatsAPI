const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

module.exports = (req, res) => {
  const { period } = req.params;
  const searchKey = period !== 'season' ? `${period}Id` : null;
  const searchQuery = req.query[searchKey];
  const periodId =
    period !== 'season' && searchQuery ? connection.escape(searchQuery) : null;
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
