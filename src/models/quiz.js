"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Question, {
        foreignKey: "quizId",
      });
      this.hasMany(models.Score, {
        foreignKey: "quizId",
      });
      this.belongsTo(models.QuizTranslation, {
        as: "en",
        foreignKey: "translationEN",
      });
      this.belongsTo(models.QuizTranslation, {
        as: "pl",
        foreignKey: "translationPL",
      });
    }
  }
  Quiz.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Quiz",
    }
  );
  return Quiz;
};
