const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

// 개별 도서 조회
const bookCheckDetail = (req, res) => {
  const authorization = ensureAuthorization(req, res);

  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'info: 로그인 세션 만료. 다시 로그인 하세요.',
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'info: 잘못된 토큰 입니다.',
    });
  } else if (authorization instanceof ReferenceError) {
    // 로그아웃 상태 시 -> liked 제외
    const bookId = req.params.id;
    const sql = `
      SELECT *,
      (SELECT count(*) FROM likes 
        WHERE liked_book_id = books.id) AS likes
      FROM books
      LEFT JOIN category 
      ON books.category_id = category.category_id WHERE books.id = ?
    `;
    const values = [parseInt(bookId)];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    // 로그인 상태 시 -> liked 포함
    const bookId = req.params.id;
    const sql = `
      SELECT *,
      (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
      (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked
      FROM books
      LEFT JOIN category 
      ON books.category_id = category.category_id WHERE books.id = ?
    `;
    const values = [authorization.id, bookId, bookId];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
  }
};

module.exports = bookCheckDetail;
