import { describe, expect, vi, beforeAll, test } from "vitest";

//mock the PostgreSQL Database and bcrypt
vi.mock("bcryptjs", () => ({
  hash: vi.fn(),
}));
vi.mock("../config/postgresDB");

const bcrypt = require("bcryptjs");
const pool = require("../config/postgresDB");
const user_signup = require("../controllers/userController");

test("user signup", async () => {
  let req, res, next;

  beforeAll(() => {
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
        verifyPassword: "password123",
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  expect("should create a new user succesfully", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");

    pool.query.mockResolvedValue({
      rows: [{ user_id: 1, email: "test@example.com" }],
    });

    await user_signup[user_signup.length - 1](req, res, next);

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 13);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      ["test@example.com", "hashedPassword"]
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });

  expect("should return 409 if email is already in use", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock database query throwing a duplicate key error
    pool.query.mockRejectedValue({ code: "23505" });

    await user_signup[user_signup.length - 1](req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ errors: "Email already in use." });
  });

  expect("should call next with error for other database errors", async () => {
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock database query throwing a generic error
    const dbError = new Error("Database error");
    pool.query.mockRejectedValue(dbError);

    await user_signup[user_signup.length - 1](req, res, next);

    expect(next).toHaveBeenCalledWith(dbError);
  });

  // Add more tests for validateEmail, validatePassword, validateVerifyPassword, and handleErrors middleware
});
