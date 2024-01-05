const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 좋아요 추가
const addLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body; // token 사용 전 테스트용 코드

  let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);`;
  let values = [parseInt(user_id), parseInt(id)];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
const rmLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body; // token 사용 전 테스트용 코드

  //   let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;`;
  let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;`;
  let values = [user_id, id];
  console.log(values);
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addLike, rmLike };
