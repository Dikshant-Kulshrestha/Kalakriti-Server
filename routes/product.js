const express = require("express");
const multer = require("multer");

const CatchAsync = require("../utils/CatchAsync.js");
const { isAuthenticated } = require("../utils/middleware.js");
const { addProduct, getProduct, addRating } = require("../controllers/product.js");

const { storage } = require("../cloudinary.js");

const upload = multer({ storage });

const router = express.Router();

router.post("/", isAuthenticated, upload.array("files"), CatchAsync(addProduct));
router.get("/:pId", CatchAsync(getProduct));

router.post("/rating", isAuthenticated, CatchAsync(addRating));

module.exports = router;
