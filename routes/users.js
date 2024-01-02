const express = require('express');
const router = express.Router();
// const conn = require('../mariadb.js');
// const { StatusCodes } = require('http-status-codes');

const join = require('../controller/UserControllder.js');

router.use(express.json());

// 회원 가입
router.post('/join', join);

// 로그인
router.post('/login', (req, res) => {
  res.json({ message: 'login' });
});

// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {
  res.json({ message: 'request refresh password' });
});

// 비밀번호 초기화
router.put('/reset', (req, res) => {
  res.json({ message: 'refresh password' });
});

module.exports = router;
