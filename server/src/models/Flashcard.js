const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
  character: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Flashcard", FlashcardSchema);
