const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const { getExploreProducts, getHomepageProduct } = require("../controllers/listing.js");
const router = express.Router();

router.get("/explore", catchAsync(getExploreProducts));
router.get("/homepage", catchAsync(getHomepageProduct));

module.exports = router;
