const userJoin = require('../services/userService/userJoin');
const userLogin = require('../services/userService/userLogin');
const userPasswordResetRequest = require('../services/userService/userPwResetRequest');
const userPwReset = require('../services/userService/userPwReset');

const join = userJoin;
const login = userLogin;
const passwordResetRequest = userPasswordResetRequest;
const passwordReset = userPwReset;

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset,
};
