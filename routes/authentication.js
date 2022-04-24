const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const { login, register } = require("../controllers/authentication.js");

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));

module.exports = router;
