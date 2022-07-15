const express = require("express");
const router = express.Router();

const {
  getQuiz,
  getQuizzes,
  postQuiz,
  putQuiz,
} = require("../controllers/quiz");

const checkToken = require("../middlewares/check-token");
const hasAdminRole = require("../middlewares/has-admin-role");

router.get("/:id", [checkToken, hasAdminRole], getQuiz);

router.get("/", [checkToken], getQuizzes);

router.post("/", [checkToken, hasAdminRole], postQuiz);

router.put("/:id", [checkToken, hasAdminRole], putQuiz);

module.exports = router;
