const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.use("local-signup");
