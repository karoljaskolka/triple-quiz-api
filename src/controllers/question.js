const models = require("../models/");

exports.getQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await models.Question.findOne({
      where: {
        id: questionId,
      },
      attributes: ["id", "correct", "quizId", "createdAt"],
      include: [
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "en",
        },
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "pl",
        },
      ],
    });
    if (question) return res.status(200).json(question);
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

exports.getQuestions = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const quizId = req.query.quizId;
  const filters = {};

  if (quizId) filters["quizId"] = quizId;

  try {
    const results = await models.Question.findAll({
      where: filters,
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ["id", "correct", "quizId", "createdAt"],
      include: [
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "en",
        },
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "pl",
        },
      ],
    });
    const totalItems = await models.Question.count();
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

exports.postQuestion = async (req, res) => {
  try {
    const translationEN = await models.QuestionTranslation.create({
      question: req.body.en.question,
      answerA: req.body.en.answerA,
      answerB: req.body.en.answerB,
      answerC: req.body.en.answerC,
      answerD: req.body.en.answerD,
    });
    const translationPL = await models.QuestionTranslation.create({
      question: req.body.pl.question,
      answerA: req.body.pl.answerA,
      answerB: req.body.pl.answerB,
      answerC: req.body.pl.answerC,
      answerD: req.body.pl.answerD,
    });
    const question = await models.Question.create({
      translationEN: translationEN.id,
      translationPL: translationPL.id,
      correct: req.body.correct,
      quizId: req.body.quizId,
    });
    const createdQuestion = await models.Question.findOne({
      where: {
        id: question.id,
      },
      attributes: ["id", "correct", "quizId", "createdAt"],
      include: [
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "en",
        },
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "pl",
        },
      ],
    });
    res.status(201).json(createdQuestion);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};

exports.putQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const oldQuestion = await models.Question.findOne({
      where: {
        id: questionId,
      },
    });
    if (!oldQuestion)
      return res.status(404).json({
        error_message: "error.not-found",
      });
    await models.QuestionTranslation.update(
      {
        question: req.body.en.question,
        answerA: req.body.en.answerA,
        answerB: req.body.en.answerB,
        answerC: req.body.en.answerC,
        answerD: req.body.en.answerD,
      },
      {
        where: {
          id: oldQuestion.translationEN,
        },
      }
    );
    await models.QuestionTranslation.update(
      {
        question: req.body.pl.question,
        answerA: req.body.pl.answerA,
        answerB: req.body.pl.answerB,
        answerC: req.body.pl.answerC,
        answerD: req.body.pl.answerD,
      },
      {
        where: {
          id: oldQuestion.translationPL,
        },
      }
    );
    const updatedQuestion = await models.Question.findOne({
      where: {
        id: questionId,
      },
      attributes: ["id", "correct", "quizId", "createdAt"],
      include: [
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "en",
        },
        {
          model: models.QuestionTranslation,
          attributes: ["question", "answerA", "answerB", "answerC", "answerD"],
          as: "pl",
        },
      ],
    });
    res.status(201).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({
      error_message: "error.internal-server-error",
      error_log: err.message,
    });
  }
};
