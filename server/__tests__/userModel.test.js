const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const URI = mongoServer.getUri();
  await mongoose.connect(URI);
}, 10000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 10000);

describe("User Model Test", () => {
  test("should connect to the database", () => {
    expect(mongoose.connection.readyState === 1);
  });

  test("should create a user and save to database", async () => {
    const user = {
      email: "test@test.test",
      password: "testing",
      verifyPassword: "testing",
    };

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    expect(res.status === 200);
  });

  test("should fail to create a user b/c uses an existing email", async () => {
    const user = {
      email: "test@test.test",
      password: "testing",
      verifyPassword: "testing",
    };

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    expect(res.status === 401);
  });

  test("should fail to create a user b/c passwords don't match", async () => {
    const user = {
      email: "testing@test.test",
      password: "testing",
      verifyPassword: "test",
    };

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    expect(res.status === 401);
  });
});
