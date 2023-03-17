const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.NEXT_MD5_HASH, { expiresIn: "15d" });
};

exports.decodeToken = async (token) => {
  let data = await jwt.verify(token, process.env.NEXT_MD5_HASH);
  return data;
};

exports.authorize = function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Restricted access",
    });
  } else {
    jwt.verify(token, process.env.NEXT_MD5_HASH, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: "Invalid Token.",
        });
      } else {
        next();
      }
    });
  }
};
