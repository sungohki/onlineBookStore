const { body } = require('express-validator');
const { validate } = require('./validator.js');
const express = require('express');
const router = express.Router();
const {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} = require('../controller/UserControllder.js');

router.use(express.json());

// 회원 가입
router
  .route('/join')
  .post(
    [
      body('email').exists().isEmail(),
      body('password').exists().isLength({ min: 4, max: 20 }),
      validate,
    ],
    join
  );
// 로그인
router
  .route('/login')
  .post(
    [
      body('email').exists().isEmail(),
      body('password').exists().isLength({ min: 4, max: 20 }),
      validate,
    ],
    login
  );
// 비밀번호 초기화 요청
router
  .route('/reset')
  .post([body('email').exists().isEmail(), validate], passwordResetRequest);
// 비밀번호 초기화
router
  .route('/reset')
  .put(
    [
      body('email').exists().isEmail(),
      body('password').exists().isLength({ min: 4, max: 20 }),
      validate,
    ],
    passwordReset
  );

module.exports = router;
