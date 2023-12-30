const express = require('express');
const router = express.Router();

router.use(express.json());

// 좋아요 추가
router.post('/:bookId', (res, req) => {
  res.json('좋아요 추가');
});

// 좋아요 취소
router.post('/:bookId', (res, req) => {
  res.json('좋아요 취소');
});

module.exports = router;
