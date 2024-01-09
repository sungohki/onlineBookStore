const express = require('express');
const router = express.Router();

router.use(express.json());

const {
  order,
  getOrders,
  getOrderDetail,
} = require('../controller/OrderController');

// 주문 하기
router.post('/', order);
// 주문 목록 조회
router.get('/', getOrders);
// 주문 상세 상품 조회
router.get('/:id', getOrderDetail);

module.exports = router;
