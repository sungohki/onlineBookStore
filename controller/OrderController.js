const orderReq = require('../services/orderService/orderReq');
const orderGetList = require('../services/orderService/orderGetList');
const orderGetDetail = require('../services/orderService/orderGetDetail');

const order = orderReq;
const getOrders = orderGetList;
const getOrderDetail = orderGetDetail;

module.exports = { order, getOrders, getOrderDetail };
