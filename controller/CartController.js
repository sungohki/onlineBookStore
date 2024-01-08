const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 장바구니 아이템 추가
const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;

  const sql = `INSERT INTO 
    cartItems (book_id, quantity, user_id)
    VALUES (?, ?, ?);`;
  const values = [book_id, quantity, user_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
// 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
  const { user_id } = req.body;
  let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price
    FROM cartItems LEFT
    JOIN books ON cartItems.book_id = books.id
    WHERE user_id = ?;`;

  conn.query(sql, user_id, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};
// 장바구니 아이템 삭제
const removeCartItem = (req, res) => {
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { addToCart, getCartItems, removeCartItem };
