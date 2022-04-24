const express = require("express");
const multer = require("multer");

const catchAsync = require("../utils/catchAsync.js");
const { isAuthenticated } = require("../utils/middleware.js");
const { addProduct, getProduct, addRating } = require("../controllers/product.js");

const { storage } = require("../cloudinary.js");

const upload = multer({ storage });

const router = express.Router();

router.post("/", isAuthenticated, upload.array("files"), catchAsync(addProduct));
router.get("/:pId", catchAsync(getProduct));

router.post("/rating", isAuthenticated, catchAsync(addRating));

module.exports = router;
