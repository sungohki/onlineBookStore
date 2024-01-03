const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 카테고리 목록 전체 조회
const allCategory = (req, res) => {
  const sql = 'SELECT * FROM category';

  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { allCategory };
