const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(port, host, () => {
      console.log(`Server is listening on ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const helmet = require("helmet");

app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./docs/swagger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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
