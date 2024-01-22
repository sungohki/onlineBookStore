const bookCheckAll = require('../services/bookService/bookCheckAll');
const bookCheckDetail = require('../services/bookService/bookCheckDetail');

const allBooks = bookCheckAll;
const bookDetail = bookCheckDetail;

module.exports = { allBooks, bookDetail };
