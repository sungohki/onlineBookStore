const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const cartAddItem = (req, res) => {
  const { book_id, quantity } = req.body;
  const authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션 만료. 다시 로그인 하세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '잘못된 토큰 입니다.',
    });
  } else {
    const sql = `
      INSERT INTO 
      cartItems (book_id, quantity, user_id)
      VALUES (?, ?, ?);
    `;
    const values = [book_id, quantity, authorization.id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

module.exports = cartAddItem;
