const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 전체 도서 | 카테고리별 도서 조회
const allBooks = (req, res) => {
  const { category_id, news, limit, currentPage } = req.query;
  const offset = parseInt(limit) * (parseInt(currentPage) - 1);
  let sql = 'SELECT * FROM books';
  let values = [parseInt(limit), offset];

  if (category_id && news) {
    sql += ` WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    values = [category_id, ...values];
  } else if (category_id) {
    sql += ` WHERE category_id = ?`;
    values = [category_id, ...values];
  } else if (news) {
    sql += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
  }
  sql += ` LIMIT ? OFFSET ?`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) return res.status(StatusCodes.OK).json(results);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);

  // const sql = 'SELECT * FROM books WHERE id = ?';
  const sql = `SELECT * FROM books LEFT JOIN
  category ON books.category_id = category.id WHERE books.id = ?`;
  conn.query(sql, bookId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = { allBooks, bookDetail };
