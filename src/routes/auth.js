const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/guest", authController.guest);

module.exports = router;
