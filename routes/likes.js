const { param } = require('express-validator');
const { validate } = require('./validator');
const express = require('express');
const router = express.Router();

router.use(express.json());

const { addLike, rmLike } = require('../controller/LikeController');

// 좋아요 추가
router.post('/:id', addLike);
// 좋아요 취소
router.delete('/:id', rmLike);

module.exports = router;
