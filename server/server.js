const express = require("express");
const path = require("path");
const cors = require("cors");

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("User connected.");
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on ${process.env.PORT || 5000}`)
);