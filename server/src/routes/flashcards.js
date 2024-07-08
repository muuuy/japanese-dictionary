const express = require("express");
const router = express.Router();

const flashcard_controller = require("../controllers/flashcardController");

router.post("/", flashcard_controller.create);

module.exports = router;
