const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/kalakriti";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

module.exports = { PORT, dbURL, JWT_SECRET };
