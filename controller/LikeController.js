const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
dotenv.config();

// jwt 토큰 권한 체크
const ensureAuthorization = (req) => {
  const receivedJwt = req.headers['authorization'];
  const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  return decodedJwt;
};

// 좋아요 추가
const addLike = (req, res) => {
  const book_id = req.params.id;
  const authorization = ensureAuthorization(req);

  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);`;
  const values = [authorization.id, parseInt(book_id)];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

const rmLike = (req, res) => {
  const book_id = req.params.id;
  const authorization = ensureAuthorization(req);

  const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;`;
  const values = [authorization.id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addLike, rmLike };
