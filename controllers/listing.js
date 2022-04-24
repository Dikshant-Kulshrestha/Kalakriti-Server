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

module.exports = { getExploreProducts, getHomepageProduct };
