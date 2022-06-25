const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Bearer {token}
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    req.userRole = decoded.userRole;
    next();
  } catch (err) {
    return res.status(401).json({
      error_message: "error.auth.unauthorized",
      error_log: err.message,
    });
  }
};
