function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("User connected.");

    socket.on("disconnect", () => {
      console.log("User disconnected.");
    });
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("join_room", (roomCode) => {
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
}

module.exports = { socketHandler };
