const express = require("express");
const router = express.Router();

const { getScores, postScore, deleteScore } = require("../controllers/score");

const checkToken = require("../middlewares/check-token");
const hasAdminRole = require("../middlewares/has-admin-role");

router.get("/", [checkToken], getScores);

router.post("/", [checkToken], postScore);

router.delete("/:id", [checkToken, hasAdminRole], deleteScore);

module.exports = router;
