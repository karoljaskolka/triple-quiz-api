const express = require("express");
const router = express.Router();

const { login, register, guest } = require("../controllers/auth");

router.post("/login", login);

router.post("/register", register);

router.post("/guest", guest);

module.exports = router;
