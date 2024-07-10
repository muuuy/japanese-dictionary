const express = require("express");
const router = express.Router();

const flashcard_controller = require("../controllers/flashcardController");

router.post("/", flashcard_controller.create);
router.post("/:id", flashcard_controller.delete);
router.put("/:id", flashcard_controller.edit);

module.exports = router;
