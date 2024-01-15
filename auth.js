const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

// jwt 토큰 권한 체크
const ensureAuthorization = (req, res) => {
  try {
    const receivedJwt = req.headers['authorization'];
    const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

    console.log('# Received JWT : ', receivedJwt);
    console.log('# Decodedd JWT : ', decodedJwt);

    return decodedJwt;
  } catch (err) {
    console.log('# ' + err.name);
    console.log(': ' + err.message);

    return err;
  }
};

module.exports = ensureAuthorization;
