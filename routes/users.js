const express = require('express');
const router = express.Router();
const conn = require('../mariadb.js');

router.use(express.json());

// 회원 가입
router.post('/join', (req, res) => {
  const { email, password } = req.body;
  let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  let values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).end(); // BAD REQUEST
    }
    res.status(201).json(results);
  });
  res.json({ message: '회원가입' });
});

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
