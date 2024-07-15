const mongoose = require("mongoose");
const User = require("../src/models/User");

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Model Test", () => {
  test("should connect to the database", () => {
    expect(mongoose.connection.readyState === 1);
  });

  test("should create a user and save to database", () => {
    async () => {
      console.log("test");
    };
  });
});
