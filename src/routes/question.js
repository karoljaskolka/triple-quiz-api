const express = require("express");
const router = express.Router();

const {
  getQuestion,
  getQuestions,
  postQuestion,
  putQuestion,
} = require("../controllers/question");

const checkToken = require("../middlewares/check-token");
const hasAdminRole = require("../middlewares/has-admin-role");

router.get("/:id", [checkToken, hasAdminRole], getQuestion);

router.get("/", [checkToken], getQuestions);

router.post("/", [checkToken, hasAdminRole], postQuestion);

router.put("/:id", [checkToken, hasAdminRole], putQuestion);

module.exports = router;
