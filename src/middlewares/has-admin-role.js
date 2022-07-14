module.exports = (req, res, next) => {
  try {
    if (req.userRole === "ROLE_ADMIN") return next();
    throw new Error("Access forbidden");
  } catch (err) {
    return res.status(403).json({
      error_message: "error.forbidden",
      error_log: err.message,
    });
  }
};
