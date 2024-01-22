const likeAdd = require('../services/likeService/likeAdd');
const likeRemove = require('../services/likeService/likeRemove');

const addLike = likeAdd;
const rmLike = likeRemove;

module.exports = { addLike, rmLike };
