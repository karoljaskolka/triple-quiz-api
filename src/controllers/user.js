const models = require("../models/");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await models.User.findOne({
      attributes: ["id", "login", "role", "createdAt"],
      where: {
        id: id,
      },
    });
    if (user) return res.status(200).json(user);
    return res.status(404).json({
      error_message: "error.not-found",
    });
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  try {
    const users = await models.User.findAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ["id", "login", "role", "createdAt"],
    });
    const totalItems = await models.User.count();
    return res.status(200).json({
      results: users,
      page: page,
      perPage: perPage,
      totalItems: totalItems,
    });
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.patchUser = async (req, res) => {
  const id = req.params.id;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await models.User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (user)
      return res.status(201).json({
        success_message: "success.user-password-updated",
      });
    return res.status(404).json({
      error_message: "error.not-found",
    });
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await models.User.findOne({
      where: {
        id: id,
      },
    });
    if (!user)
      return res.status(404).json({
        error_message: "error.not-found",
      });
    const result = await models.User.destroy({
      where: {
        id: id,
      },
    });
    if (result) {
      res.status(200).json({
        success_message: "success.user-delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};
