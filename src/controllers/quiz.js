const models = require("../models/");

exports.getQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await models.Quiz.findOne({
      where: {
        id: quizId,
      },
      attributes: ["id", "createdAt"],
      include: [
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "en",
        },
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "pl",
        },
      ],
    });
    if (quiz) return res.status(200).json(quiz);
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

exports.getQuizzes = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  try {
    const results = await models.Quiz.findAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ["id", "createdAt"],
      include: [
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "en",
        },
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "pl",
        },
      ],
    });
    const totalItems = await models.Quiz.count();
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

exports.postQuiz = async (req, res) => {
  try {
    const translationEN = await models.QuizTranslation.create({
      name: req.body.en.name,
      description: req.body.en.description,
    });
    const translationPL = await models.QuizTranslation.create({
      name: req.body.pl.name,
      description: req.body.pl.description,
    });
    const quiz = await models.Quiz.create({
      translationEN: translationEN.id,
      translationPL: translationPL.id,
    });
    const createdQuiz = await models.Quiz.findOne({
      where: {
        id: quiz.id,
      },
      attributes: ["id", "createdAt"],
      include: [
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "en",
        },
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "pl",
        },
      ],
    });
    res.status(201).json(createdQuiz);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.putQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const oldQuiz = await models.Quiz.findOne({
      where: {
        id: quizId,
      },
    });
    if (!oldQuiz)
      return res.status(404).json({
        error_message: "error.not-found",
      });
    await models.QuizTranslation.update(
      {
        name: req.body.en.name,
        description: req.body.en.description,
      },
      {
        where: {
          id: oldQuiz.translationEN,
        },
      }
    );
    await models.QuizTranslation.update(
      {
        name: req.body.pl.name,
        description: req.body.pl.description,
      },
      {
        where: {
          id: oldQuiz.translationPL,
        },
      }
    );
    const updatedQuiz = await models.Quiz.findOne({
      where: {
        id: quizId,
      },
      attributes: ["id", "createdAt"],
      include: [
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "en",
        },
        {
          model: models.QuizTranslation,
          attributes: ["name", "description"],
          as: "pl",
        },
      ],
    });
    res.status(201).json(updatedQuiz);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};
