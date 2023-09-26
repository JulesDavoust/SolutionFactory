const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.cjs");

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log(decoded.userID)
    req.userId = decoded.userID;
    req.admin = decoded.isAdmin;
    next();
  });
};


const authMiddleware = {
  verifyToken: verifyToken,
};
module.exports = authMiddleware;