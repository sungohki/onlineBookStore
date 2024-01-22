const cartAddItem = require('../services/cartService/cartAddItem');
const cartGetItems = require('../services/cartService/cartGetItems');
const cartRmItem = require('../services/cartService/cartRmItem');

const addToCart = cartAddItem;
const getCartItems = cartGetItems;
const removeCartItem = cartRmItem;

module.exports = { addToCart, getCartItems, removeCartItem };
