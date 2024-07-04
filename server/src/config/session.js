const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const sessionOptions = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 86400000 },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    autoRemove: "native",
  }),
};

module.exports = session(sessionOptions);
