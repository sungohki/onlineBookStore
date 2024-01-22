const userJoin = require('../services/userService/userJoin');
const userLogin = require('../services/userService/userLogin');
const userPasswordResetReq = require('../services/userService/userPwResetReq');
const userPwReset = require('../services/userService/userPwReset');

const join = userJoin;
const login = userLogin;
const passwordResetRequest = userPasswordResetReq;
const passwordReset = userPwReset;

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset,
};
