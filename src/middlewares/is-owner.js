module.exports = (req, res, next) => {
  try {
    if (req.userId === req.params.id) next();
    throw new Error("You are not an owner of the resource");
  } catch (err) {
    return res.status(403).json({
      error_message: "error.forbidden",
      error_log: err.message,
    });
  }
};
