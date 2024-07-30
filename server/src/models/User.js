const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

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

const User = mongoose.model("User", UserSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser };
