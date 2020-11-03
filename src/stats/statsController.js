const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

module.exports = (req, res) => {
  const seasonQuery = statsQuery();

  connection.query(seasonQuery, (err, results) => {
    if (err) throw err;
    const resObj = {
      period: req.params.period,
      stats: results,
    };
    res.json(resObj);
  });
};
