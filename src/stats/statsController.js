const connection = require('../db/connection');

module.exports = (req, res) => {
  connection.query('select * from players', (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
};
