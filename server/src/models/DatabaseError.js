//Custom Error class for database
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
    Error.captureStackTrace(this, DatabaseError);
  }
}

module.exports = { DatabaseError };
