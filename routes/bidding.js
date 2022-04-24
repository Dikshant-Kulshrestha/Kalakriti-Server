const express = require("express");
const CatchAsync = require("../utils/CatchAsync.js");
const { isAuthenticated } = require("../utils/middleware.js");
const { addBid } = require("../controllers/bidding.js");
const router = express.Router();

router.post("/", isAuthenticated, CatchAsync(addBid));

module.exports = router;
