const express = require('express');
const router = express.Router();

router.use(express.json());

// 주문 하기
router.post('/', (res, req) => {
  res.json('주문 하기');
});
// 주문 목록 조회
router.get('/', (res, req) => {
  res.json('주문 목록 조회');
});
// 주문 상세 상품 조회
router.get('/:id', (res, req) => {
  res.json('주문 상세 상품 조회');
});

module.exports = router;
