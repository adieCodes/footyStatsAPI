const connection = require('../db/connection');
const { statsQuery } = require('./statsQueryBuilder');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const validParams = ['season', 'week', 'month'];
  const { period } = req.params;

  if (!validParams.includes(period)) {
    return next({
      status: 400,
      message: `Invalid param: We only accept ${validParams.toString()}`,
    });
  }

  const searchKey = period !== 'season' ? `${period}Id` : null;
  // Safe to disable this check as we ensure period is valid and we use this to define searchKey
  // eslint-disable-next-line security/detect-object-injection
  const searchQuery = req.query[searchKey];
  const periodId =
    period !== 'season' && searchQuery ? connection.escape(searchQuery) : null;
  const seasonQuery = statsQuery(period, periodId);

  connection.query(seasonQuery, (err, results) => {
    if (err) return next(err);
    const resObj = {
      period: req.params.period,
      stats: results,
    };
    return res.json(resObj);
  });
};
