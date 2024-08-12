const session = require("express-session");
const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;

require("dotenv").config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => {
  console.log("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", () => {
  console.log("Connected to redis.");
});

const sessionOptions = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 86400000 },
  store: new RedisStore({ client: redisClient }),
};

// const connectRedis = require("connect-redis");
// const MongoStore = require("connect-mongo");
// const sessionOptions = {
//   secret: process.env.EXPRESS_SESSION_SECRET,
//   saveUninitialized: false,
//   resave: false,
//   cookie: { maxAge: 86400000 },
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI,
//     collectionName: "sessions",
//     autoRemove: "native",
//   }),
// };

// module.exports = session(sessionOptions);

module.exports = session(sessionOptions);
