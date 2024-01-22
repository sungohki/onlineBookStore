const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const orderGetDetail = async (req, res) => {
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
  } else if (authorization instanceof ReferenceError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그아웃 상태입니다.',
    });
  } else {
    const orderId = req.params.id;
    const sql = `
    SELECT book_id, title, author, price, quantity
    FROM orderedBook LEFT JOIN books
    ON orderedBook.book_id = books.id
    WHERE order_id = ?;
  `;

    const [rows, fields] = await conn.query(sql, [orderId]);
    return res.status(StatusCodes.OK).json(rows);
  }
};

module.exports = orderGetDetail;
