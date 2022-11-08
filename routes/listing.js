const express = require("express");
const CatchAsync = require("../utils/CatchAsync.js");
const { getExploreProducts, getHomepageProduct, getProductsByUser } = require("../controllers/listing.js");
const router = express.Router();

router.get("/explore", CatchAsync(getExploreProducts));
router.get("/homepage", CatchAsync(getHomepageProduct));
router.get("/seller", CatchAsync(getProductsByUser));

module.exports = router;
