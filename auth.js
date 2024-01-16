const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

// jwt 토큰 권한 체크
const ensureAuthorization = (req, res) => {
  try {
    const receivedJwt = req.headers['authorization'];
    console.log('# Received JWT : ', receivedJwt);

    if (receivedJwt) {
      const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
      console.log('# Decodedd JWT : ', decodedJwt);

      return decodedJwt;
    } else {
      throw new ReferenceError('JWT must be provided');
    }
  } catch (err) {
    console.log('# ' + err.name);
    console.log(': ' + err.message);

    return err;
  }
};

module.exports = ensureAuthorization;
