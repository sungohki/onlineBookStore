const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const likeRemove = (req, res) => {
  const book_id = req.params.id;
  const authorization = ensureAuthorization(req);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션 만료. 다시 로그인 하세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '잘못된 토큰 입니다.',
    });
  } else {
    const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;`;
    const values = [authorization.id, book_id];

    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

module.exports = likeRemove;
