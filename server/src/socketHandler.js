class activeRooms {
  constructor() {
    this.rooms = new Map();
  }

  doesRoomExist(roomCode) {
    if (this.rooms.get(roomCode)) {
      console.log("exists");
      return true;
    }

    console.log("does not exist");
    return false;
  }

  createRoom(roomCode, userID, userName) {
    const exists = this.doesRoomExist(roomCode);

    if (exists) {
      return false;
    } else {
      this.rooms.set(roomCode, new Map().set(userID, userName));
      console.log(this.rooms);
      return true;
    }
  }

  addPeople(roomCode, userID, userName) {
    const exists = this.doesRoomExist(roomCode);

    if (exists) {
      const room = this.rooms.get(roomCode);
      room.set(userID, userName);
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
      console.log(`User ${socket.id} disonnected`);
    });

    /**
     * Creates a new room.
     *
     * @param {Object} info - An object that contains the room information.
     * @param {string} info.roomCode - The code of the new room.
     * @param {string} info.name - The name of the user.
     */
    socket.on("create_room", (info) => {
      if (info.roomCode) {
        const addedRoom = rooms.createRoom(info.roomCode, socket.id, info.name);
        if (addedRoom) socket.join(info.roomCode);
      }
    });

    /**
     * Joins an existing room.
     *
     * @param {Object} info - An object containing room information.
     * @param {string} info.roomCode - The code of the room to join.
     * @param {string} info.name - The name of the user.
     */
    socket.on("join_room", (info) => {
      if (info.roomCode) {
        const addedPerson = rooms.addPeople(
          info.roomCode,
          socket.id,
          info.name
        );
        if (addedPerson) socket.join(info.roomCode);
      }
    });

    /**
     * Sends coordinates to people who are in the same room.
     *
     * @param {Object} coordinates - The coordinates and pen details.
     * @param {number} coordinates.startX - The starting X coordinate.
     * @param {number} coordinates.startY - The starting Y coordinate.
     * @param {number} coordinates.endX - The ending X coordinate.
     * @param {number} coordinates.endY - The ending Y coordinate.
     * @param {string} coordinates.color - The color of the pen.
     * @param {number} coordinates.size - The size of the pen.
     */
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
