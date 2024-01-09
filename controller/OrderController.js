const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

const ex = (req, res) => {
  const sql = ``;
  const values = [];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {};
