const express = require("express");
const router = express.Router();
const passport = require("passport");
const { body } = require("express-validator");

const user_controller = require("../controllers/userController");

router.post("/signup", user_controller.user_signup);
router.post("/login", user_controller.user_login);
router.post("/forgot-password", user_controller.forgot_password);
router.post("/reset-password", user_controller.reset_password);
router.post("/logout", user_controller.user_logout);

router.post("/authenticate", user_controller.authenticate);

module.exports = router;
