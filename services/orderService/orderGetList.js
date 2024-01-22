const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const orderGetList = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'BookShop',
    password: 'root',
    dateStrings: true,
  });
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
    SELECT orders.id, created_at, address, receiver, contact
    , book_title, total_quantity, total_price
    FROM orders LEFT JOIN delivery
    ON orders.delivery_id = delivery.id
    WHERE orders.user_id = ?;
  `;
    const [rows, fields] = await conn.query(sql, [authorization.id]);
    return res.status(StatusCodes.OK).json(rows);
  }
};

module.exports = orderGetList;
