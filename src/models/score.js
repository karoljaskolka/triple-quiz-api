const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const User = require("./user");
const Quiz = require("./quiz");

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Scores",
  }
);

Score.belongsTo(User);
User.hasMany(Score);
Score.belongsTo(Quiz);
Quiz.hasMany(Score);

module.exports = Score;
