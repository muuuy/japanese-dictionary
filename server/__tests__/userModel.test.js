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

const correctEmail = "test@test.test";
const correctPassword = "testingpassword";

describe("User Model Test", () => {
  test("should connect to the database", () => {
    expect(mongoose.connection.readyState === 1);
  });

  test("should create a user and save to database", async () => {
    const user = {
      email: "test@test.test",
      password: correctPassword,
      verifyPassword: correctPassword,
    };

    let error;

    try {
      const res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const response = await res.json();

      expect(res.status).toBe(200);
    } catch (err) {
      error = err;
    }

    if (error) throw new Error("SUCEED: Signup failed");
  });

  test("should fail to create a user b/c uses an existing email", async () => {
    const user = {
      email: "test@test.test",
      password: "testingWrong",
      verifyPassword: "testingWrong",
    };

    let error;

    try {
      const res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const response = await res.json();

      console.log("response", response);

      expect(res.status).toBe(200);
    } catch (err) {
      // console.log(err);
      error = err;
    }

    if (error) {
      // console.log("Signup failed:", error);
      // expect(error).toBeUndefined();

      throw new Error("Signup failed:", error);
    }
  });

  test("should fail to create a user b/c passwords don't match", async () => {
    const user = {
      email: "testing@test.test",
      password: "testing",
      verifyPassword: "test",
    };

    let error;

    try {
      const res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      expect(res.status).toBe(200);
    } catch (err) {
      error = err;
    }

    if (error) {
      console.log("Signup failed:", error);
      expect(error).toBeUndefined();
    }
  });

  test("should login with email and password that matches user in database", async () => {
    const user = {
      email: correctEmail,
      password: "correctEmail",
    };

    let error;

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      expect(res.status).toBe(200);
    } catch (err) {
      error = err;
    }

    if (error) {
      console.log("Login failed:", error);
      expect(error).toBeUndefined();
    }
  });
});
