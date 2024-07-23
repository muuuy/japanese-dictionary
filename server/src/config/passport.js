const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function verify(email, password, callback) {
    try {
      console.log("test");
      let user = await User.findOne({ email: email }).exec();
      if (!user)
        return callback(null, false, {
          message: "Incorrect username or password.",
        });

      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return callback(null, false, {
          message: "Incorrect username or password.",
        });

      return callback(null, user);
    } catch (err) {
      console.log(err);
      return callback(null, err);
    }
  })
);

passport.serializeUser((user, callback) => {
  process.nextTick(function () {
    callback(null, user.id);
  });
});

passport.deserializeUser((id, callback) => {
  User.findById(id, (err, user) => {
    callback(err, user);
  });
});

module.exports = passport;
