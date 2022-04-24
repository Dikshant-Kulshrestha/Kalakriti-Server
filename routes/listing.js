const express = require("express");
const CatchAsync = require("../utils/CatchAsync.js");
const { getExploreProducts, getHomepageProduct } = require("../controllers/listing.js");
const router = express.Router();

router.get("/explore", CatchAsync(getExploreProducts));
router.get("/homepage", CatchAsync(getHomepageProduct));

module.exports = router;
