const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(function verify(username, passport, cb) {
    User.findOne({ username: username }, async function (err, user) {
      if (err) return cb(err);
      if (!user)
        return cb(null, false, { message: "Incorrect username or password. " });

      const match = await bcrypt.compare(password, user.password);
      try {
        if (match) return done(null, user);
        else return done(null, false, { message: "Incorrect password." });
      } catch (err) {
        return done(err);
      }
    });
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
