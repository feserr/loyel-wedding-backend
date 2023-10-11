const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  return jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.user = user;
    return next();
  });
};

module.exports = verifyToken;
