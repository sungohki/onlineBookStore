const express = require('express');
const router = express.Router();
// const conn = require('../mariadb.js');
// const { StatusCodes } = require('http-status-codes');
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require('../controller/UserControllder.js');

router.use(express.json());

// 회원 가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', passwordResetRequest);

// 비밀번호 초기화
router.put('/reset', passwordReset);

module.exports = router;
