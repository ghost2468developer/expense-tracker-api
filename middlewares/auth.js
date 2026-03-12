const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;
module.exports = (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(' ')[1] ||
      req.body.token ||
      req.headers.token;
    const decoded = jwt.verify(token, secret);
    req.body.token = decoded;
  } catch (error) {
    return res.status(401).json({
      message: 'Auth Failed (Invalid Token)',
    });
  }
  return next();
};
