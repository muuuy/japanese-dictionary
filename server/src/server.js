const express = require("express");
const path = require("path");
const cors = require("cors");
var logger = require("morgan");
var createError = require("http-errors");
const { socketHandler } = require("./socketHandler.js");
const passport = require("./config/passport.js");

const usersRouter = require("./routes/user");
const flashcardRouter = require("./routes/flashcards.js");
const vocabRouter = require("./routes/vocab.js");
const matchingRouter = require("./routes/matching.js");

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const session = require("./config/session.js");
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/flashcards", flashcardRouter);
app.use("/vocab", vocabRouter);
app.use("/matching", matchingRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

socketHandler(io);

app.use("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on ${process.env.PORT || 5000}`)
);
