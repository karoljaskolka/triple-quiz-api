const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const QuizTranslation = require("./quiz-translation");

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    tableName: "Quizzes",
  }
);

QuizTranslation.hasOne(Quiz, { foreignKey: "translationEN" });
QuizTranslation.hasOne(Quiz, { foreignKey: "translationPL" });

module.exports = Quiz;
