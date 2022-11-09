const { Types } = require("mongoose");
const Category = require("../models/Category.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");

const addProduct = async (req, res) => {
  const { title, description, amount, expiryDate, categoryId } = JSON.parse(req.body.data);

  const product = new Product({
    owner: req.token.id,
    title: title,
    description: description,
    basePrice: amount,
    category: new Types.ObjectId(categoryId),
    endTs: Date.parse(expiryDate),
  });

  product.images = req.files.map((file) => ({ url: file.path, filename: file.filename }));

  await product.save();

  /* Sets up a Timer till Bidding Ends */
  setTimeout(async () => {
    const newProduct = await Product.findById(product._id);

    if (newProduct && newProduct.bids && newProduct.bids.length) {
      const winningBid = newProduct.bids[newProduct.bids.length - 1];

      await Product.updateOne({ _id: new Types.ObjectId(product._id) }, { $set: { "winner.user": winningBid.owner, "winner.amount": winningBid.amount } });

      newProduct.winner.user = winningBid.owner;
      newProduct.winner.amount = winningBid.amount;
    }

    /* TODO: Send a Mail to the Winner Here */
  }, (Date.parse(expiryDate) - Date.now()));

  return res.status(201).send({ message: "Product Added Successfully", data: product });
};

const getProduct = async (req, res) => {
  const { pId } = req.params;

  const product = await Product.findById(pId).populate("owner bids.owner", "firstName lastName ratings");

  return res.status(200).send({ message: "Product Fetched Successfully", data: product });
};

const addRating = async (req, res) => {
  const { pId, stars, review } = req.body;

  const product = await Product.findById(pId).populate("owner bids.owner", "firstName lastName ratings");

  if (Date.now() < Date.parse(product.endTs)) {
    return res.status(400).send({ message: "Failed to Add Rating", error: "Auction is still Live" });
  }

  if (!product.bids.length) {
    return res.status(400).send({ message: "Failed to Add Rating", error: "Product was Unsold" });
  } else {
    if (!product.bids[product.bids.length - 1].owner.equals(req.token.id)) {
      return res
        .status(400)
        .send({ message: "Failed to Add Rating", error: "Only the Buyer can Add Ratings" });
    }
  }

  if (product.rating) product.rating = stars;
  if (product.review) product.review = description;

  const rating = {
    product: product._id,
    rating: stars,
  };

  const owner = await User.findById(product.owner);
  const ratingId = owner.ratings.findIndex((rating) => rating.product.equals(product._id));
  if (ratingId > -1) {
    owner.ratings[ratingId] = rating;
  } else owner.ratings.push(rating);

  await product.save();
  await owner.save();

  return res.status(200).send({ message: "Rating Added Successfully", data: product });
};

const getCategories = async (req, res) => {
  const categories = await Category.find({ });

  return res.status(200).send({ message: "Successfully Fetched Categories", data: categories });
};

module.exports = { addProduct, getProduct, addRating, getCategories };
