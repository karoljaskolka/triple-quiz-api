"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionTranslation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Question, {
        as: "en",
        foreignKey: "translationEN",
      });
      this.hasOne(models.Question, {
        as: "pl",
        foreignKey: "translationPL",
      });
    }
  }
  QuestionTranslation.init(
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
      sequelize,
      modelName: "QuestionTranslation",
    }
  );
  return QuestionTranslation;
};
