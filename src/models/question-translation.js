const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const QuestionTranslation = sequelize.define(
  "QuestionTranslation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "QuestionTranslations",
    timestamps: false,
  }
);

module.exports = QuestionTranslation;
