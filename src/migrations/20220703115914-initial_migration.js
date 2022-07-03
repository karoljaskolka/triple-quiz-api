"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      login: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("QuizTranslations", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable("QuestionTranslations", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      question: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      answerA: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      answerB: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      answerC: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      answerD: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable("Quizzes", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      translationEN: {
        references: {
          model: "QuizTranslations",
          key: "id",
          as: "translationEN",
        },
        type: Sequelize.UUID,
      },
      translationPL: {
        references: {
          model: "QuizTranslations",
          key: "id",
          as: "translationPL",
        },
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("Scores", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      score: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        references: {
          model: "Users",
          key: "id",
          as: "userId",
        },
        type: Sequelize.UUID,
      },
      quizId: {
        references: {
          model: "Quizzes",
          key: "id",
          as: "quizId",
        },
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable("Questions", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      password: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quizId: {
        references: {
          model: "Quizzes",
          key: "id",
          as: "quizId",
        },
        type: Sequelize.UUID,
      },
      translationEN: {
        references: {
          model: "QuestionTranslations",
          key: "id",
          as: "translationEN",
        },
        type: Sequelize.UUID,
      },
      translationPL: {
        references: {
          model: "QuestionTranslations",
          key: "id",
          as: "translationPL",
        },
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Scores");
    await queryInterface.dropTable("Questions");
    await queryInterface.dropTable("Quizzes");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("QuizTranslations");
    await queryInterface.dropTable("QuestionTranslations");
  },
};
