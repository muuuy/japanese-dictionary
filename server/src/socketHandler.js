class activeRooms {
  constructor() {
    this.rooms = {};
  }

  doesRoomExist(roomCode) {
    if (this.rooms[roomCode]) {
      console.log("exists");
      return true;
    }

    console.log("does not exist");
    return false;
  }

  clearRooms() {
    this.rooms = {};
  }
}

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
