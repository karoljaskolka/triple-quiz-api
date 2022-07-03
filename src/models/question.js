"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quiz, {
        foreignKey: "quizId",
      });
      this.belongsTo(models.QuestionTranslation, {
        as: "en",
        foreignKey: "translationEN",
      });
      this.belongsTo(models.QuestionTranslation, {
        as: "pl",
        foreignKey: "translationPL",
      });
    }
  }
  Question.init(
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
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
