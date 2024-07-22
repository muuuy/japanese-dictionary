const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.use(
  "local-signup",
  new LocalStrategy(async function verify(email, password, callback) {
    try {
      let user = await User.findOne({ email: email }).exec();

      if (user)
        return callback(null, false, { message: "Email already exists." });
    } catch (err) {
      console.log(err);
    }
  })
);
