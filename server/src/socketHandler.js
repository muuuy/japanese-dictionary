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

  addRoom(roomCode) {
    const exists = this.doesRoomExist(roomCode);

    if (exists) {
      return false;
    } else {
      this.rooms[roomCode] = [];
      console.log(this.rooms);
      return true;
    }
  }

  addPeople(roomCode, userID) {
    const exists = this.doesRoomExist(roomCode);

    if (exists) {
      this.rooms.roomCode[roomCode].push(userID);
      console.log(this.rooms);
      return true;
    } else {
      return false;
    }
  }

  clearAllRooms() {
    this.rooms = {};
  }
}

const rooms = new activeRooms();

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("User connected.");

    socket.on("disconnect", () => {
      console.log("User disconnected.");
    });
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("create_room", (roomCode) => {
      if (roomCode) {
        const addedRoom = rooms.addRoom(roomCode);
        if (addedRoom) socket.join(roomCode);
      }
    });

    socket.on("join_room", (roomCode) => {
      if (roomCode) {
        const addedPerson = rooms.addPeople(roomCode, "hi");
        if (addedPerson) socket.join(roomCode);
      }
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
