const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');

const userJoin = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');
  const sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
  const values = [email, hashPassword, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
    }
    if (results.affectedRows)
      return res
        .status(StatusCodes.CREATED)
        .json({ message: `# info: ${email} Account Created Success.` });
    else return res.status(StatusCodes.BAD_REQUEST).end();
  });
};

module.exports = userJoin;
