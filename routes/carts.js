const express = require('express');
const router = express.Router();

router.use(express.json());

// 장바구니 담기
router.post('/', (res, req) => {
  res.json('장바구니 담기');
});
// 장바구니 조회
router.get('/', (res, req) => {
  res.json('장바구니 담기');
});
// 장바구니 도서 삭제
router.delete('/:id', (res, req) => {
  res.json(' 장바구니 도서 삭제');
});
// // 장바구니에서 선택한 주문 예상 상품 목록 조회
// router.get('/carts', (res, req) => {
//   res.json(' 장바구니에서 선택한 주문 예상 상품 목록 조회');
// });
module.exports = router;
