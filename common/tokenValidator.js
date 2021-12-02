const config = require('../common/config.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (token == undefined) {
      return res.status(401).json({ "error": true, "message": 'Access Denied.' });
    }
    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(401).json({ "error": true, "message": 'Access Denied.' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).json({
        "error": true,
        "message": 'No token provided.'
      });
    }
  }
  catch (Exception) {
    return res.status(200).json('Token Expired');
  }
};