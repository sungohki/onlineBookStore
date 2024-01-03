const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 전체 도서 | 카테고리별 도서 조회
const allBooks = (req, res) => {
  const { category_id } = req.query;

  if (category_id) {
    const sql = 'SELECT * FROM books WHERE category_id = ?';
    conn.query(sql, category_id, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length) return res.status(StatusCodes.OK).json(results);
      else return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    const sql = 'SELECT * FROM books';
    conn.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);

  const sql = 'SELECT * FROM books WHERE id = ?';
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
