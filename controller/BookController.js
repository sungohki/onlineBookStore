const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 전체 도서 조회
const allBooks = (req, res) => {};

// 개별 도서 조회
const bookDetail = (req, res) => {};

// 카테고리별 도서 목록 조회
const booksByCategory = (req, res) => {};

module.exports = { allBooks, bookDetail, booksByCategory };
