const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Quiz = require("./quiz");
const QuestionTranslation = require("./question-translation");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    correct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Questions",
  }
);

Question.belongsTo(Quiz);
Quiz.hasMany(Question);

QuestionTranslation.hasOne(Question, { foreignKey: "translationEN" });
QuestionTranslation.hasOne(Question, { foreignKey: "translationPL" });

module.exports = Question;
