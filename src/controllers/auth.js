const signToken = require("../utils/sign-token");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        login: req.body.login,
      },
    });
    if (!user) {
      return res.status(400).json({
        error_message: "error.auth.wrong-login-or-password",
      });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      const token = signToken(user);
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(400).json({
        error_message: "error.auth.wrong-login-or-password",
      });
    }
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        login: req.body.login,
      },
    });
    if (user) {
      return res.status(400).json({
        error_message: "error.auth.login-taken",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      login: req.body.login,
      password: hashedPassword,
      role: "ROLE_USER",
    });
    res.status(201).json({
      id: newUser.id,
      login: newUser.login,
      role: newUser.role,
      createdAt: newUser.createdAt,
    });
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.guest = async (req, res) => {
  try {
    const user = await User.create({
      login: `GUEST_${Math.floor(Math.random() * 2147483647)}`,
      password: null,
      role: "ROLE_GUEST",
    });
    const token = signToken(user);
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};
