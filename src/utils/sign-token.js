const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const token = jwt.sign(
    {
      userLogin: user.login,
      userId: user.id,
      userRole: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "4h",
    }
  );
  return token;
};
