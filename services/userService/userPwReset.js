const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');

const userPwReset = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString('base64');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');

  const sql = 'UPDATE users SET password=?, salt=? WHERE email=?';
  const values = [hashedPassword, salt, email];
  conn.execute(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
    }
    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};

module.exports = userPwReset;
