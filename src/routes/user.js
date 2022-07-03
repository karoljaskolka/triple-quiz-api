const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  patchUser,
  deleteUser,
} = require("../controllers/user");

const checkToken = require("../middlewares/check-token");
const hasAdminRole = require("../middlewares/has-admin-role");
const isOwner = require("../middlewares/is-owner");

router.get("/:id", [checkToken], getUser);

router.get("/", [checkToken, hasAdminRole], getUsers);

router.patch("/:id", [checkToken, isOwner], patchUser);

router.delete("/:id", [checkToken, hasAdminRole], deleteUser);

module.exports = router;
