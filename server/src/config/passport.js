const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(
  "local-signup",
  new LocalStrategy({ usernameField: "email" }, async function verify(
    email,
    password,
    verifyPassword,
    done
  ) {
    try {
      let user = await User.findOne({ email: email }).exec();

      if (user) {
        return done(null, false, { message: "Email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 13);
      user = new User({
        email: email,
        password: hashedPassword,
        flashcards: [],
      });
      await user.save();

      // return done(null, user);
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
