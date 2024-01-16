const ensureAuthorization = require('../auth');
const jwt = require('jsonwebtoken');
const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 장바구니 아이템 추가
const addToCart = (req, res) => {
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

// 장바구니 아이템 목록 조회
// + (장바구니에서 선택한) 주문 예상 상품 목록 조회
const getCartItems = (req, res) => {
  const { selected } = req.body;
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
    let sql = `
      SELECT cartItems.id, book_id, title, summary, quantity, price
      FROM cartItems LEFT
      JOIN books ON cartItems.book_id = books.id
      WHERE user_id = ?
    `;
    let values = [authorization.id];
    if (selected) {
      // 주문서 작성 시 '선택한 장바구니 목록 조회'
      sql += ` AND cartItems.id IN (?)`;
      values.push(selected);
    }
    conn.query(sql + ';', values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

// 장바구니 아이템 삭제
const removeCartItem = (req, res) => {
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
    const cartItemId = req.params.id;
    const sql = `DELETE FROM cartItems WHERE id = ?`;
    const values = [cartItemId];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

module.exports = { addToCart, getCartItems, removeCartItem };
