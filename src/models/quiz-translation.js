const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const QuizTranslation = sequelize.define(
  "QuizTranslation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "QuizTranslations",
    timestamps: false,
  }
);

module.exports = QuizTranslation;
