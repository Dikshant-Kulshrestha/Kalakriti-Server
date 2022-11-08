const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { dbURL } = require("./config.js");
const { info, error } = require("./utils/logger.js");

const authenticationRoutes = require("./routes/authentication.js");
const productRoutes = require("./routes/product.js");
const listingRoutes = require("./routes/listing.js");
const biddingRoutes = require("./routes/bidding.js");
const sellerRoutes = require("./routes/seller.js");

const app = express();

mongoose.connect(dbURL);

mongoose.connection.on("error", error.bind(console, "Mongoose Connection Error, "));
mongoose.connection.once("open", () => {
  info("Connection to the Database Established");
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authenticationRoutes);
app.use("/api/product", productRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bidding", biddingRoutes);
app.use("/api/seller", sellerRoutes);

module.exports = app;
