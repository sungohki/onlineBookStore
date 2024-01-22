const conn = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');

const userPwReset = (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT * FROM users  WHERE email = ?';

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end(); // BAD REQUEST
    }

    const user = results[0];

    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    } else return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

module.exports = userPwReset;
