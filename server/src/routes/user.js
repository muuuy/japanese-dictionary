const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.post("/signup/", user_controller.user_signup);

module.exports = router;
