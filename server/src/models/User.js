const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  flashcards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flashcard",
      default: [],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
