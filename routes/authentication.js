const express = require("express");
const CatchAsync = require("../utils/CatchAsync.js");
const { login, register } = require("../controllers/authentication.js");

const router = express.Router();

router.post("/login", CatchAsync(login));
router.post("/register", CatchAsync(register));

module.exports = router;
