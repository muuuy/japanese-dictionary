const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res, next) => {
  res.send("testing");
});

io.on("connection", (socket) => {
  console.log("User connected.");
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on ${process.env.PORT || 5000}`)
);
