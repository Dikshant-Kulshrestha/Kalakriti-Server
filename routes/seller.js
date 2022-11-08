const express = require("express");
const CatchAsync = require("../utils/CatchAsync.js");
const { getSellerDetails } = require("../controllers/seller.js");
const router = express.Router();

router.get("/", CatchAsync(getSellerDetails));

module.exports = router;
