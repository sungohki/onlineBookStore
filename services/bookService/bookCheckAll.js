const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

// 전체 도서 | 카테고리별 도서 조회
const bookCheckAll = (req, res) => {
  const { category_id, news, limit, currentPage } = req.query;
  const offset = parseInt(limit) * (parseInt(currentPage) - 1);
  let allBooksRes = {};
  let sql = `SELECT SQL_CALC_FOUND_ROWS *,
  (SELECT count(*) FROM likes WHERE liked_book_id = books.id)
  AS likes FROM books`;
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
  sql += ` LIMIT ? OFFSET ?;`;
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) {
      results.map((result) => {
        result.pubDate = result.pub_date;
        delete result.pub_date;
      });
      allBooksRes.books = results;
    } else return res.status(StatusCodes.NOT_FOUND).end();
  });

  // 총 도서 수 반환
  sql = `SELECT found_rows();`;
  conn.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    let pagination = {};
    pagination.currentPage = parseInt(currentPage);
    pagination.totalCount = results[0]['found_rows()'];
    allBooksRes.pagination = pagination;
    return res.status(StatusCodes.OK).json(allBooksRes);
  });
};

module.exports = bookCheckAll;
