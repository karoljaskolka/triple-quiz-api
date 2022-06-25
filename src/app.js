const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

const { sequelize } = require("./sequelize");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
