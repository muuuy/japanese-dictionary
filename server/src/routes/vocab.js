const express = require("express");
const router = express.Router();

const vocab_controller = require("../controllers/vocabController");

router.post("/:id", vocab_controller.validate_answer);

module.exports = router;
