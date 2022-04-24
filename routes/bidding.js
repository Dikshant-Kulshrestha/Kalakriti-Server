const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const { isAuthenticated } = require("../utils/middleware.js");
const { addBid } = require("../controllers/bidding.js");
const router = express.Router();

router.post("/", isAuthenticated, catchAsync(addBid));

module.exports = router;
