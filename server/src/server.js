const express = require("express");
const path = require("path");
const cors = require("cors");
var logger = require("morgan");
var createError = require("http-errors");

const usersRouter = require("./routes/user");
const flashcardRouter = require("./routes/flashcards.js");

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server);

require("./config/db")();
const session = require("./config/session.js");
app.use(session);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/flashcards", flashcardRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("join_room", (roomCode) => {
    console.log(roomCode);
    socket.join(roomCode);
  });

  socket.on("send_coordinates", (coordinates) => {
    socket.to(coordinates.roomCode).emit("recieve_coordinates", {
      startMouseX: coordinates.startMouseX,
      startMouseY: coordinates.startMouseY,
      mouseX: coordinates.mouseX,
      mouseY: coordinates.mouseY,
      color: coordinates.color,
      size: coordinates.size,
    });
  });
});

app.use("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on ${process.env.PORT || 5000}`)
);
