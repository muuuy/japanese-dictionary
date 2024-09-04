const express = require("express");
const router = express.Router();

const matching_controller = require("../controllers/matchingController");

router.post("/id:", matching_controller.validate_answer);

module.exports = router;
