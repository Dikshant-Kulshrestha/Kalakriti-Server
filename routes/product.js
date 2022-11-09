const express = require("express");
const multer = require("multer");

const CatchAsync = require("../utils/CatchAsync.js");
const { isAuthenticated } = require("../utils/middleware.js");
const { addProduct, getProduct, addRating, getCategories } = require("../controllers/product.js");

const { storage } = require("../cloudinary.js");

const upload = multer({ storage });

const router = express.Router();

router.get("/categories", CatchAsync(getCategories));
router.get("/:pId", CatchAsync(getProduct));

router.post("/", isAuthenticated, upload.array("files"), CatchAsync(addProduct));
router.post("/rating", isAuthenticated, CatchAsync(addRating));

module.exports = router;
