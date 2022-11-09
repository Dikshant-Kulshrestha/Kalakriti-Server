const { Types, isValidObjectId } = require("mongoose");
const Product = require("../models/Product.js");

const getExploreProducts = async (req, res) => {
  const live = await Product.find({ endTs: { $gt: Date.now() } }).sort({ endTs: +1 });
  const finished = await Product.find({ endTs: { $lte: Date.now() } }).sort({ endTs: +1 });

  return res.status(200).send({ message: "Successfully Fetched Products", data: [...live, ...finished] });
};

const getHomepageProduct = async (req, res) => {
  const latest = await Product.find({ endTs: { $gt: Date.now() } })
    .sort({ endTs: +1 })
    .limit(1);

  return res.status(200).send({ message: "Successfully Fetched Product", data: latest });
};

const getProductsByUser = async (req, res) => {
  const { user } = req.query;

  if (!isValidObjectId(user)) {
    return res.status(400).send({ error: "Not a Valid User ID" });
  }

  const products = await Product.find({ owner: new Types.ObjectId(user) });

  return res.status(200).send({ message: "Successfully Fetched Products", data: products });
};

const searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ error: "Please Enter a Valid Search Term" });
  }

  const products = await Product.find({ $text: { $search: query } });

  return res.status(200).send({ message: "Successfully Fetched Search Results", data: products });
};

module.exports = { getExploreProducts, getHomepageProduct, getProductsByUser, searchProducts };
