const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;

const { sequelize } = require("./src/models");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const cors = require("cors");

app.use(
  cors({
    origin: ["https://triple-quiz-angular.vercel.app"],
  })
);

const helmet = require("helmet");

app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./src/docs/swagger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const scoreRoutes = require("./src/routes/score");
const questionRoutes = require("./src/routes/question");
const quizRoutes = require("./src/routes/quiz");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quizzes", quizRoutes);

const path = require("path");

app.use("/angular", express.static(path.join(__dirname, "public/angular")));

app.get("/angular/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/angular/index.html"));
});

app.use("/react", express.static(path.join(__dirname, "public/react")));

app.get("/react/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/react/index.html"));
});

app.use("/vue", express.static(path.join(__dirname, "public/vue")));

app.get("/vue/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/vue/index.html"));
});

app.use((req, res, next) => {
  res.status(404).json({
    error_message: "error.not-found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error_message: "error.internal-server-error",
    error_log: err.message,
  });
});
