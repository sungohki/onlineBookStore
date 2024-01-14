// const conn = require('../mariadb'); // promise wrapping을 위한 모듈화 포기
const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'BookShop',
    password: 'root',
    dateStrings: true,
  });

  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  // delivery 테이블 데이터 삽입
  let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = await conn.execute(sql, values);

  const delivery_id = results.insertId;

  // orders 테이블 데이터 삽입
  sql = `
    INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
    VALUES (?, ?, ?, ?, ?);
  `;
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
  [results] = await conn.execute(sql, values);

  const order_id = results.insertId;

  // orderedBook 테이블 데이터 삽입
  sql = `
    INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;
  `;
  values = [];
  items.forEach((item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });
  [results] = await conn.query(sql, [values]);

  return res.status(StatusCodes.OK).json(results);
};

const getOrders = (req, res) => {
  const sql = ``;
  const values = [];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};
const getOrderDetail = (req, res) => {
  const sql = ``;
  const values = [];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = { order, getOrders, getOrderDetail };
