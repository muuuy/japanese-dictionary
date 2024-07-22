const express = require("express");
const router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");

// router.post("/signup", user_controller.user_signup);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);
router.post("/login", user_controller.user_login);
router.post("/forgot-password", user_controller.forgot_password);
router.post("/reset_password/:token", user_controller.reset_password);
router.post("/logout", user_controller.logout);

router.post("/authenticate", user_controller.authenticate);

module.exports = router;
