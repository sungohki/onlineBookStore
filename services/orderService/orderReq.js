const ensureAuthorization = require('../../auth');
const jwt = require('jsonwebtoken');
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const orderReq = async (req, res) => {
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
    const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
      req.body;

    // delivery 테이블 데이터 삽입
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
    let [results] = await conn.execute(sql, values);
    const delivery_id = results.insertId;

    // orders 테이블 데이터 삽입
    sql = `
    INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
    VALUES (?, ?, ?, ?, ?);
  `;
    values = [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      authorization.id,
      delivery_id,
    ];
    [results] = await conn.execute(sql, values);

    const order_id = results.insertId;

    // 장바구니에서 book_id, quantity 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?);`;
    const [orderItems, fields] = await conn.query(sql, [items]);

    // orderedBook 테이블 데이터 삽입
    sql = `
    INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;
  `;
    values = [];
    orderItems.forEach((item) => {
      values.push([order_id, item.book_id, item.quantity]);
    });
    results = await conn.query(sql, [values]);

    // 결제된 장바구니 도서 삭제
    const result = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(result);
  }
};

const deleteCartItems = async (conn, items) => {
  const sql = `DELETE FROM cartItems where id in (?);`;
  const results = await conn.query(sql, [items]);
  return results;
};

module.exports = orderReq;
