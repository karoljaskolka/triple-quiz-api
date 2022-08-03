const models = require("../models/");

exports.getScores = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const quizId = req.query.quizId;
  const userId = req.query.userId;
  const filters = {};

  if (quizId) filters["quizId"] = quizId;
  if (userId) filters["userId"] = userId;

  try {
    const results = await models.Score.findAll({
      where: filters,
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ["id", "score", "quizId", "createdAt"],
      order: [
        ["score", "DESC"],
        ["createdAt", "ASC"],
      ],
      include: [
        {
          model: models.User,
          attributes: ["id", "login", "role", "createdAt"],
          required: true,
        },
      ],
    });
    const totalItems = await models.Score.count();
    return res.status(200).json({
      results: results,
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

exports.postScore = async (req, res) => {
  const senderId = req.userId;
  try {
    // Only first score should be visible in scoreboard
    const existingScore = await models.Score.findOne({
      where: {
        quizId: req.body.quizId,
        userId: senderId,
      },
    });
    // Return 200 code to not display error message
    if (existingScore)
      return res.status(200).json({
        success_message: "success.no-action-needed",
      });
    const score = await models.Score.create({
      score: req.body.score,
      userId: senderId,
      quizId: req.body.quizId,
    });
    const createdScore = await models.Score.findOne({
      where: {
        id: score.id,
      },
      attributes: ["id", "score", "quizId", "createdAt"],
      include: [
        {
          model: models.User,
          attributes: ["id", "login", "role", "createdAt"],
          required: true,
        },
      ],
    });
    res.status(201).json(createdScore);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.deleteScore = async (req, res) => {
  const id = req.params.id;
  try {
    const score = await models.Score.findOne({
      where: {
        id: id,
      },
    });
    if (!score)
      return res.status(404).json({
        error_message: "error.not-found",
      });
    const result = await models.Score.destroy({
      where: {
        id: id,
      },
    });
    if (result) {
      res.status(200).json({
        success_message: "success.score-delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};
